import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Title } from '@/modules/components'
import { getOrderById } from '@/modules/order/controller/orderActions'
import { currencyFormat } from '@/modules/shared/ui/utils'
import { PayPalButton } from '@/modules/components'
import { OrderStatus } from '@/modules/order/ui/components/OrderStatus'
import { titleFont } from '@/modules/config/fonts'
import { IoLocationOutline, IoLockClosedOutline } from 'react-icons/io5'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function OrderIdPage({ params }: Props) {
  const id = (await params).id

  const { ok, order } = await getOrderById(id)

  if (!ok) {
    redirect('/')
  }

  const address = order!.OrderAddress

  return (
    <div className="app-container space-y-8 pb-16">
      <Title
        title={`Detalle de Pedido #${id.split('-').at(-1)}`}
        subtitle="Consulta el desglose de productos, dirección de entrega y estado de pago."
        className="my-0"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Items */}
        <div className="space-y-4 lg:col-span-7">
          <OrderStatus isPaid={order?.isPaid ?? false} />

          <div className="space-y-3">
            {order!.OrderItem.map((item) => (
              <div
                key={item.product.slug + '-' + item.size}
                className="border-surface-highest bg-surface-low flex items-center space-x-4 rounded-xl border p-4 shadow-md"
              >
                {item.product.ProductImage[0]?.url ? (
                  <div className="bg-surface-highest h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={`/products/${item.product.ProductImage[0].url}`}
                      width={80}
                      height={80}
                      alt={item.product.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="bg-surface-highest h-20 w-20 flex-shrink-0 rounded-lg" />
                )}

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className={`${titleFont.className} line-clamp-1 text-sm font-extrabold text-white`}>
                      {item.product.title}
                    </h3>
                    <p className="text-on-surface-variant mt-1 text-xs">
                      Talla:{' '}
                      <span className="bg-primary-fixed text-on-primary-fixed rounded px-1.5 py-0.5 text-[10px] font-black">
                        {item.size}
                      </span>{' '}
                      • Cantidad: <span className="text-white">{item.quantity}</span>
                    </p>
                  </div>

                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-on-surface-variant text-xs font-bold">{currencyFormat(item.price)} /ud</span>
                    <span className={`${titleFont.className} text-primary-fixed text-base font-extrabold`}>
                      {currencyFormat(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Address & Payment Summary */}
        <div className="lg:col-span-5">
          <div className="border-surface-highest bg-surface-container space-y-6 rounded-2xl border p-6 shadow-xl">
            {/* Address */}
            <div>
              <div className="border-surface-highest flex items-center space-x-2 border-b pb-3">
                <IoLocationOutline className="text-primary-fixed h-5 w-5" />
                <h2 className={`${titleFont.className} text-base font-extrabold text-white`}>Dirección de Entrega</h2>
              </div>

              <div className="text-on-surface-variant mt-3 space-y-1 text-xs">
                <p className="text-sm font-bold text-white">
                  {address!.firstName} {address!.lastName}
                </p>
                <p>{address!.address}</p>
                {address!.address2 && <p>{address!.address2}</p>}
                <p>
                  {address!.postalCode} - {address!.city}, {address!.countryId}
                </p>
                <p className="text-primary-fixed font-semibold">Tel: {address!.phone}</p>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="border-surface-highest flex items-center space-x-2 border-b pb-3">
                <IoLockClosedOutline className="text-primary-fixed h-5 w-5" />
                <h2 className={`${titleFont.className} text-base font-extrabold text-white`}>Resumen de Pago</h2>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="text-on-surface-variant flex justify-between">
                  <span>Productos ({order?.itemsInOrder}):</span>
                  <span className="font-semibold text-white">
                    {order?.itemsInOrder === 1 ? '1 artículo' : `${order?.itemsInOrder} artículos`}
                  </span>
                </div>

                <div className="text-on-surface-variant flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-white">{currencyFormat(order!.subTotal)}</span>
                </div>

                <div className="text-on-surface-variant flex justify-between">
                  <span>Impuestos (IVA):</span>
                  <span className="font-semibold text-white">{currencyFormat(order!.tax)}</span>
                </div>

                <div className="border-surface-highest border-t pt-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-extrabold tracking-wider text-white uppercase">Total:</span>
                    <span className="text-primary-fixed text-2xl font-black">{currencyFormat(order!.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PayPal Button or Status */}
            <div className="pt-2">
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
