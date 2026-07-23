'use client'
import { useSyncExternalStore } from 'react'
import Image from 'next/image'

import { useCartStore } from '@/modules/store'
import { currencyFormat } from '@/modules/shared/utils'
import { v4 as uuidv4 } from 'uuid'

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart)
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
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>
            <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  )
}
