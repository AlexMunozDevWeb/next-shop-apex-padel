'use client'

import { useSyncExternalStore } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/modules/store'
import { currencyFormat } from '@/modules/shared/utils'
import { titleFont } from '@/modules/config/fonts'

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart)
  const loaded = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (!loaded) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-surface-container h-24 animate-pulse rounded-xl"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {productsInCart.map((product) => (
        <div
          key={`${product.id}-${product.size}`}
          className="border-surface-highest bg-surface-low flex items-center space-x-4 rounded-xl border p-4 shadow-md"
        >
          <div className="bg-surface-highest h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={`/products/${product.image}`}
              width={80}
              height={80}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <div>
              <p className={`${titleFont.className} line-clamp-1 text-sm font-extrabold text-white`}>{product.title}</p>
              <p className="text-on-surface-variant mt-1 text-xs font-semibold">
                Talla:{' '}
                <span className="bg-primary-fixed text-on-primary-fixed rounded px-1.5 py-0.5 text-[10px] font-black">
                  {product.size}
                </span>{' '}
                • Cantidad: <span className="text-white">{product.quantity}</span>
              </p>
            </div>

            <p className={`${titleFont.className} text-primary-fixed mt-2 text-base font-extrabold`}>
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
