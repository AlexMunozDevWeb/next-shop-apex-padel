'use client'

import { placeOrder } from '@/modules/order/controller/orderActions'
import { useAddressStore, useCartStore } from '@/modules/store'
import { currencyFormat } from '@/modules/shared/utils'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState, useSyncExternalStore } from 'react'
import { useShallow } from 'zustand/shallow'

export const PlaceOrder = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  const address = useAddressStore((state) => state.address)
  const { itemsInCart, subTotal, tax, total } = useCartStore(useShallow((state) => state.getSummaryInformation()))
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)

  // Fixes hydration problems
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

    //! Server action
    const resp = await placeOrder(productsToOrder, address)
    console.log('Respuesta: ')
    console.log(resp)

    if (!resp.ok) {
      setIsPlacingOrder(false)
      setErrorMessage(resp.message ?? '')
      return
    }

    //* Todo salio bien!
    clearCart()
    router.replace('/orders/' + resp.order?.id)
  }

  if (!loaded) {
    return <p>Loading...</p>
  }

  return (
    <div className="rounded-xl bg-white p-7 shadow-xl">
      <h2 className="mb-2 text-2xl">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}{' '}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="mb-10 h-0.5 w-full rounded bg-gray-200" />

      <h2 className="mb-2 text-2xl">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{itemsInCart === 1 ? '1 articulo' : `${itemsInCart} articulos`}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-right text-2xl">{currencyFormat(total)}</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en Colocar orden, aceptas nuestros{' '}
            <a
              href="#"
              className="underline"
            >
              términos y condiciones
            </a>{' '}
            y{' '}
            <a
              href="#"
              className="underline"
            >
              política de privacidad
            </a>
          </span>
        </p>
        <p className="text-red-500">{errorMessage}</p>
        <button
          onClick={onPlaceOrder}
          className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
        >
          Colocar orden
        </button>
      </div>
    </div>
  )
}
