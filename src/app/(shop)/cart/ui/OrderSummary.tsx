'use client'

import { useSyncExternalStore } from 'react'
import { useShallow } from 'zustand/shallow'
import { useCartStore } from '@/modules/store'
import { currencyFormat } from '@/modules/shared/utils'

export const OrderSummary = () => {
  const loaded = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  const { itemsInCart, subTotal, tax, total } = useCartStore(useShallow((state) => state.getSummaryInformation()))

  if (!loaded) return <div className="bg-surface-container h-28 animate-pulse rounded-xl" />

  return (
    <div className="space-y-3.5 text-xs">
      <div className="text-on-surface-variant flex justify-between">
        <span>Subtotal ({itemsInCart} artículos):</span>
        <span className="font-semibold text-white">{currencyFormat(subTotal)}</span>
      </div>

      <div className="text-on-surface-variant flex justify-between">
        <span>Envío Express:</span>
        <span className="text-primary-fixed font-extrabold uppercase">GRATIS</span>
      </div>

      <div className="text-on-surface-variant flex justify-between">
        <span>Impuestos Estimados (IVA):</span>
        <span className="font-semibold text-white">{currencyFormat(tax)}</span>
      </div>

      <div className="bg-surface-highest my-2 h-px w-full" />

      <div className="flex items-end justify-between pt-1">
        <div>
          <p className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">Total a Pagar</p>
          <p className="text-on-surface text-2xl font-black">{currencyFormat(total)}</p>
        </div>
      </div>
    </div>
  )
}
