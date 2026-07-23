import Image from 'next/image'
import { redirect } from 'next/navigation'
import { IoCardOutline } from 'react-icons/io5'

import { Title } from '@/modules/components'
import { getOrderById } from '@/modules/order/controller/orderActions'

import clsx from 'clsx'
import { currencyFormat } from '@/modules/shared/utils'
import { PayPalButton } from '@/modules/components'
import { OrderStatus } from '@/modules/components/orders/OrderStatus'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function OrderIdPage({ params }: Props) {
  const id = (await params).id

  // Todo: Llamar el server action
  const { ok, order } = await getOrderById(id)

  if (!ok) {
    redirect('/')
  }

  const address = order!.OrderAddress

  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col">
        <Title
          className=""
          title={`Orden #${id}`}
        />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Carrito */}
          <div className="mt-5 flex flex-col">
            <OrderStatus isPaid={order?.isPaid ?? false} />

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div
                key={item.product.slug + '-' + item.size}
                className="mb-5 flex"
              >
                {/* //TODO: añadir imagen por defecto si el producto no tiene imagen (Todos los productos deben de llevar) */}
                {item.product.ProductImage[0]?.url && (
                  <Image
                    src={`/products/${item.product.ProductImage[0].url}`}
                    width={100}
                    height={100}
                    alt={item.product.title}
                    className="mr-5 rounded"
                    style={{
                      width: '100px',
                      height: '100px',
                    }}
                  />
                )}

                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="rounded-xl bg-white p-7 shadow-xl">
            <h2 className="mb-2 text-2xl">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address!.firstName} {address!.lastName}
              </p>
              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.postalCode}</p>
              <p>
                {address!.city}, {address!.countryId}
              </p>
              <p>{address!.phone}</p>
            </div>

            {/* Divider */}
            <div className="mb-10 h-0.5 w-full rounded bg-gray-200" />

            <h2 className="mb-2 text-2xl">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order?.itemsInOrder === 1 ? '1 artículo' : `${order?.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order!.subTotal)}</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-right text-2xl">{currencyFormat(order!.total)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {order?.isPaid ? (
                <OrderStatus isPaid={order?.isPaid ?? false} />
              ) : (
                <PayPalButton
                  amount={order!.total}
                  orderId={order!.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
