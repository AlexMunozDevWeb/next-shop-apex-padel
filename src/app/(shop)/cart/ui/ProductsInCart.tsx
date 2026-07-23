'use client'
import { useSyncExternalStore } from 'react'
import Image from 'next/image'

import { useCartStore } from '@/modules/store'
import { QuantitySelector } from '@/modules/components'

import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart)
  const updateProductQuatity = useCartStore((state) => state.updateProductQuatity)
  const removeProduct = useCartStore((state) => state.removeProduct)
  const loaded = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (!loaded) {
    return <p>Loading...</p>
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div
          key={uuidv4()}
          className="mb-5 flex"
        >
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: '100px',
              height: '100px',
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <Link
              className="cursor-pointer hover:underline"
              href={`/product/${product.slug}`}
            >
              <p>
                {product.size} - {product.title}
              </p>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) => updateProductQuatity(product, quantity)}
            />

            <button
              onClick={() => removeProduct(product)}
              className="mt-3 underline"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
