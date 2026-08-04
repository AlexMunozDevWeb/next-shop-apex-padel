import clsx from 'clsx'
import { IoCardOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'

interface Props {
  isPaid: boolean
}

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div
      className={clsx(
        'mb-5 flex items-center justify-between rounded-xl border px-4 py-3 text-xs font-extrabold tracking-wide uppercase shadow-sm',
        {
          'border-red-800 bg-red-950/60 text-red-300': !isPaid,
          'bg-primary-fixed/20 text-primary-fixed border-primary-fixed/40': isPaid,
        }
      )}
    >
      <div className="flex items-center space-x-2">
        {isPaid ? (
          <IoCheckmarkCircleOutline className="text-primary-fixed h-5 w-5" />
        ) : (
          <IoCardOutline className="h-5 w-5 text-red-400" />
        )}
        <span>{isPaid ? 'Pedido Pagado Exitosamente' : 'Pendiente de Pago'}</span>
      </div>
      <span className="text-[10px] opacity-75">{isPaid ? 'CONFIRMADO' : 'ACCION REQUERIDA'}</span>
    </div>
  )
}
