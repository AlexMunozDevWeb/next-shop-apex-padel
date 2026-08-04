'use client'

import { useState } from 'react'
import { QuantitySelector, SizeSelector } from '@/modules/products/ui/components'
import type { CartProduct, Product, Size } from '@/modules/products/domain'
import { useCartStore } from '@/modules/store'
import { IoBagHandleOutline, IoCheckmarkCircleOutline, IoFlashOutline } from 'react-icons/io5'

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart)
  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)
  const [addedSuccess, setAddedSuccess] = useState(false)

  const handleAddToCart = () => {
    setPosted(true)
    if (!size) return

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    }

    addProductToCart(cartProduct)
    setPosted(false)
    setAddedSuccess(true)

    setTimeout(() => {
      setAddedSuccess(false)
      setQuantity(1)
      setSize(undefined)
    }, 2500)
  }

  return (
    <div className="space-y-6">
      {posted && !size && (
        <div className="fade-in rounded-xl border border-red-800/80 bg-red-950/60 p-3.5 text-xs font-semibold text-red-300">
          * Selecciona una talla antes de añadir al carrito.
        </div>
      )}

      {/* Size Selector */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* Quantity & Stock Line */}
      <div className="flex items-center space-x-4">
        <QuantitySelector
          quantity={quantity}
          onQuantityChanged={setQuantity}
        />

        <div className="border-surface-highest flex flex-1 items-center space-x-2 border-l pl-4">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-on-surface-variant text-[11px] font-extrabold tracking-wide uppercase">
            En Stock: Envío en 24h
          </span>
        </div>
      </div>

      {/* CTA Actions - Stitch Double Buttons */}
      <div className="flex flex-col space-y-3 pt-2">
        <button
          onClick={handleAddToCart}
          className={`h-14 w-full ${
            addedSuccess
              ? 'text-primary-fixed border-primary-fixed border bg-black'
              : 'bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed/90'
          } flex items-center justify-center space-x-2 rounded-xl text-xs font-extrabold tracking-wider uppercase shadow-xl transition-all active:scale-[0.98]`}
        >
          {addedSuccess ? (
            <>
              <IoCheckmarkCircleOutline className="text-primary-fixed h-5 w-5" />
              <span>¡Añadido al Carrito!</span>
            </>
          ) : (
            <>
              <IoBagHandleOutline className="h-5 w-5" />
              <span>AÑADIR AL CARRITO</span>
            </>
          )}
        </button>

        <button
          onClick={handleAddToCart}
          className="bg-surface-highest hover:bg-surface-highest/80 flex h-14 w-full items-center justify-center space-x-2 rounded-xl text-xs font-extrabold tracking-wider text-white uppercase transition-all active:scale-[0.98]"
        >
          <IoFlashOutline className="text-primary-fixed h-5 w-5" />
          <span>COMPRAR AHORA</span>
        </button>
      </div>
    </div>
  )
}
