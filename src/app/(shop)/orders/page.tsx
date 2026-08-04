export const revalidate = 0

import { getOrdersByUser } from '@/modules/order/controller/orderActions'
import { Title } from '@/modules/components'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { IoCardOutline, IoChevronForwardOutline } from 'react-icons/io5'

export default async function OrdersPage() {
  const { ok, orders = [] } = await getOrdersByUser()

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <div className="space-y-6 pb-16">
      <Title
        title="Mis Pedidos"
        subtitle="Consulta el historial de tus pedidos y su estado de procesamiento."
        className="my-0"
      />

      <div className="overflow-hidden rounded-2xl border border-[#e3e2e7] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#e3e2e7] bg-[#f4f3f8] tracking-wider text-[#4c4546] uppercase">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-extrabold"
                >
                  ID Pedido
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-extrabold"
                >
                  Destinatario
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-extrabold"
                >
                  Estado de Pago
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-right font-extrabold"
                >
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4f3f8]">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm font-medium text-[#4c4546]"
                  >
                    No has realizado ningún pedido todavía.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-[#faf8fe]"
                  >
                    <td className="px-6 py-4 font-mono font-bold text-[#1a1b1f]">#{order.id.split('-').at(-1)}</td>
                    <td className="px-6 py-4 font-medium text-[#1a1b1f]">
                      {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                    </td>
                    <td className="px-6 py-4">
                      {order.isPaid ? (
                        <span className="inline-flex items-center space-x-1.5 rounded-full border border-[#c1f100]/40 bg-[#c1f100]/20 px-3 py-1 text-[11px] font-extrabold text-black">
                          <IoCardOutline className="h-3.5 w-3.5 text-[#506600]" />
                          <span>Pagada</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1.5 rounded-full border border-red-200 bg-red-100 px-3 py-1 text-[11px] font-extrabold text-red-700">
                          <IoCardOutline className="h-3.5 w-3.5 text-red-600" />
                          <span>Pendiente de Pago</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/orders/${order.id}`}
                        className="inline-flex items-center space-x-1 rounded-lg border border-[#e3e2e7] bg-white px-3 py-1.5 text-xs font-bold text-[#1a1b1f] transition-all hover:bg-black hover:text-white"
                      >
                        <span>Detalles</span>
                        <IoChevronForwardOutline className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
