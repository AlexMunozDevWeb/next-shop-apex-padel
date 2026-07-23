import type { Size } from '@/modules/products/domain'
import type { Address } from '@/modules/address/domain'

export type ProductToOrder = {
  productId: string
  quantity: number
  size: Size
}

export type OrderTotals = {
  subTotal: number
  tax: number
  total: number
}

export type OrderSummary = {
  id: string
  subTotal: number
  tax: number
  total: number
  itemsInOrder: number
  isPaid: boolean
  paidAt?: Date | null
  createdAt: Date
  updatedAt: Date
  userId: string
  transactionId?: string | null
}

export type OrderListItem = OrderSummary & {
  OrderAddress?: {
    firstName: string
    lastName: string
  } | null
}

export type OrderDetail = OrderSummary & {
  OrderAddress?: {
    firstName: string
    lastName: string
    address: string
    address2?: string | null
    postalCode: string
    city: string
    phone: string
    countryId: string
  } | null
  OrderItem: {
    price: number
    quantity: number
    size: Size
    product: {
      title: string
      slug: string
      ProductImage: { url: string }[]
    }
  }[]
}

export type OrderResult = {
  ok: boolean
  message?: string
  order?: { id: string }
  prismaTx?: unknown
}

export type OrderListResult = {
  ok: boolean
  message?: string
  orders?: OrderListItem[]
}

export type OrderDetailResult = {
  ok: boolean
  message?: string
  order?: OrderDetail
}

export const TAX_RATE = 0.15

export const calculateOrderTotals = (
  productIds: ProductToOrder[],
  products: { id: string; price: number }[]
): OrderTotals => {
  return productIds.reduce(
    (totals, item) => {
      const product = products.find((p) => p.id === item.productId)

      if (!product) throw new Error(`${item.productId} no existe - 500`)

      const subTotal = product.price * item.quantity

      totals.subTotal += subTotal
      totals.tax += subTotal * TAX_RATE
      totals.total += subTotal * (1 + TAX_RATE)

      return totals
    },
    { subTotal: 0, tax: 0, total: 0 }
  )
}

export const countItemsInOrder = (productIds: ProductToOrder[]): number => {
  return productIds.reduce((count, p) => count + p.quantity, 0)
}
