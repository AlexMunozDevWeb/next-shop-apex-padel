'use client'
import { useState } from 'react'

import { QuantitySelector, SizeSelector } from '@/modules/components'
import type { CartProduct, Product, Size } from '@/modules/products/domain'
import { useCartStore } from '@/modules/store'

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart)
  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)

  const AddToCart = () => {
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
    setQuantity(1)
    setSize(undefined)
  }

  return (
    <>
      {posted && !size && <span className="fade-in mt-2 text-red-500">Debe de seleccionar una talla*</span>}
      {/* Selector de Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* Selector de Cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={setQuantity}
      />

      {/* Button */}
      <button
        onClick={AddToCart}
        className="btn-primary my-5"
      >
        Agregar al carrito
      </button>
    </>
  )
}
