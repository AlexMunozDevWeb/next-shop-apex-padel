import { prisma } from '@/modules/shared/lib/prisma'
import type { Address } from '@/modules/address/domain'
import type { ProductToOrder } from '../domain'
import { calculateOrderTotals, countItemsInOrder } from '../domain'
import { iOrderRepository } from './iOrderRepository'

export const orderRepository: iOrderRepository = {
  placeOrder: async (userId, productIds, address) => {
    const products = await prisma.product.findMany({
      where: { id: { in: productIds.map((p) => p.productId) } },
    })

    const itemsInOrder = countItemsInOrder(productIds)
    const { subTotal, tax, total } = calculateOrderTotals(productIds, products)

    try {
      const prismaTx = await prisma.$transaction(async (tx) => {
        const updatedProductsPromises = products.map((product) => {
          const productQuantity = productIds
            .filter((p) => p.productId === product.id)
            .reduce((acc, item) => item.quantity + acc, 0)

          if (productQuantity === 0) {
            throw new Error(`${product.id} no tiene cantidad definida`)
          }

          return tx.product.update({
            where: { id: product.id },
            data: { inStock: { decrement: productQuantity } },
          })
        })

        const updatedProducts = await Promise.all(updatedProductsPromises)

        updatedProducts.forEach((product) => {
          if (product.inStock < 0) {
            throw new Error(`${product.title} no tiene inventario suficiente`)
          }
        })

        const order = await tx.order.create({
          data: {
            userId,
            itemsInOrder,
            subTotal,
            tax,
            total,
            OrderItem: {
              createMany: {
                data: productIds.map((p) => ({
                  quantity: p.quantity,
                  size: p.size,
                  productId: p.productId,
                  price: products.find((product) => product.id === p.productId)?.price ?? 0,
                })),
              },
            },
          },
        })

        const orderAddress = await tx.orderAddress.create({
          data: {
            firstName: address.firstName,
            lastName: address.lastName,
            address: address.address,
            address2: address.address2,
            postalCode: address.postalCode,
            city: address.city,
            phone: address.phone,
            countryId: address.country,
            orderId: order.id,
          },
        })

        return { order, orderAddress, updatedProducts }
      })

      return { ok: true, order: prismaTx.order, prismaTx }
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : 'Ocurrió un error inesperado',
      }
    }
  },

  getOrderById: async (id) => {
    try {
      const order = await prisma.order.findUnique({
        where: { id },
        include: {
          OrderAddress: true,
          OrderItem: {
            select: {
              price: true,
              quantity: true,
              size: true,
              product: {
                select: {
                  title: true,
                  slug: true,
                  ProductImage: { select: { url: true }, take: 1 },
                },
              },
            },
          },
        },
      })

      if (!order) throw new Error(`${id} no existe`)

      return { ok: true, order }
    } catch (error) {
      console.log(error)
      return { ok: false, message: 'No existe el pedido.' }
    }
  },

  getOrdersByUser: async (userId) => {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        OrderAddress: { select: { firstName: true, lastName: true } },
      },
    })

    return { ok: true, orders }
  },

  getPaginatedOrders: async () => {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        OrderAddress: { select: { firstName: true, lastName: true } },
      },
    })

    return { ok: true, orders }
  },
}
