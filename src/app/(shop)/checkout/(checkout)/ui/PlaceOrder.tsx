'use client'

import { placeOrder } from '@/modules/order/controller/orderActions'
import { useAddressStore, useCartStore } from '@/modules/store'
import { currencyFormat } from '@/modules/shared/utils'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState, useSyncExternalStore } from 'react'
import { useShallow } from 'zustand/shallow'
import { titleFont } from '@/modules/config/fonts'
import { IoCheckmarkCircleOutline, IoLocationOutline, IoLockClosedOutline } from 'react-icons/io5'

export const PlaceOrder = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  const address = useAddressStore((state) => state.address)
  const { itemsInCart, subTotal, tax, total } = useCartStore(useShallow((state) => state.getSummaryInformation()))
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)

  const loaded = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }))

    const resp = await placeOrder(productsToOrder, address)

    if (!resp.ok) {
      setIsPlacingOrder(false)
      setErrorMessage(resp.message ?? '')
      return
    }

    clearCart()
    router.replace('/orders/' + resp.order?.id)
  }

  if (!loaded) {
    return <div className="bg-surface-container h-96 animate-pulse rounded-2xl" />
  }

  return (
    <div className="border-surface-highest bg-surface-container space-y-6 rounded-2xl border p-6 shadow-xl">
      {/* Shipping Address Section */}
      <div>
        <div className="border-surface-highest flex items-center space-x-2 border-b pb-3">
          <IoLocationOutline className="text-primary-fixed h-5 w-5" />
          <h2 className={`${titleFont.className} text-base font-extrabold text-white`}>Dirección de Entrega</h2>
        </div>

        <div className="text-on-surface-variant mt-3 space-y-1 text-xs">
          <p className="text-sm font-bold text-white">
            {address.firstName} {address.lastName}
          </p>
          <p>{address.address}</p>
          {address.address2 && <p>{address.address2}</p>}
          <p>
            {address.postalCode} - {address.city}, {address.country}
          </p>
          <p className="text-primary-fixed font-semibold">Tel: {address.phone}</p>
        </div>
      </div>

      {/* Summary Section */}
      <div>
        <div className="border-surface-highest flex items-center space-x-2 border-b pb-3">
          <IoCheckmarkCircleOutline className="text-primary-fixed h-5 w-5" />
          <h2 className={`${titleFont.className} text-base font-extrabold text-white`}>Resumen del Pedido</h2>
        </div>

        <div className="mt-3 space-y-2 text-xs">
          <div className="text-on-surface-variant flex justify-between">
            <span>Productos ({itemsInCart}):</span>
            <span className="font-semibold text-white">
              {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
            </span>
          </div>

          <div className="text-on-surface-variant flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold text-white">{currencyFormat(subTotal)}</span>
          </div>

          <div className="text-on-surface-variant flex justify-between">
            <span>Impuestos (IVA):</span>
            <span className="font-semibold text-white">{currencyFormat(tax)}</span>
          </div>

          <div className="border-surface-highest border-t pt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-extrabold tracking-wider text-white uppercase">Total:</span>
              <span className="text-primary-fixed text-2xl font-black">{currencyFormat(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button and Disclaimer */}
      <div className="space-y-3 pt-2">
        <p className="text-on-surface-variant text-[11px] leading-relaxed">
          Al confirmar tu pedido, aceptas los{' '}
          <a
            href="#"
            className="hover:text-primary-fixed font-bold text-white underline"
          >
            Términos de servicio
          </a>{' '}
          de Apex Padel.
        </p>

        {errorMessage && (
          <div className="rounded-xl border border-red-800 bg-red-950/60 p-3.5 text-xs font-semibold text-red-300">
            {errorMessage}
          </div>
        )}

        <button
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
          className={clsx('w-full py-4 text-xs font-extrabold tracking-wider uppercase shadow-xl', {
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
        >
          {isPlacingOrder ? 'PROCESANDO PEDIDO...' : 'CONFIRMAR Y REALIZAR PEDIDO'}
        </button>

        <div className="text-on-surface-variant flex items-center justify-center space-x-2 text-[11px]">
          <IoLockClosedOutline className="text-primary-fixed h-4 w-4" />
          <span>Pago Seguro Encriptado</span>
        </div>
      </div>
    </div>
  )
}
