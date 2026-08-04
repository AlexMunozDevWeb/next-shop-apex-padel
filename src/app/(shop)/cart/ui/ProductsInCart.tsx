'use client'

import { useSyncExternalStore } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoTrashOutline } from 'react-icons/io5'
import { useCartStore } from '@/modules/store'
import { QuantitySelector } from '@/modules/components'
import { currencyFormat } from '@/modules/shared/utils'
import { titleFont } from '@/modules/config/fonts'

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart)
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity)
  const removeProduct = useCartStore((state) => state.removeProduct)
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
            className="bg-surface-container h-28 animate-pulse rounded-xl"
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
          className="group border-surface-highest bg-surface-low relative flex flex-col gap-4 rounded-xl border p-4 shadow-md transition-all sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-surface-highest relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={`/products/${product.image}`}
                width={100}
                height={100}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <Link
                className={`${titleFont.className} hover:text-primary-fixed line-clamp-1 text-base font-extrabold text-white transition-colors`}
                href={`/product/${product.slug}`}
              >
                {product.title}
              </Link>
              <div className="mt-1 flex items-center space-x-2">
                <span className="bg-primary-fixed text-on-primary-fixed rounded-full px-2.5 py-0.5 text-[10px] font-extrabold">
                  Talla: {product.size}
                </span>
                <span className="text-on-surface-variant text-xs font-bold">{currencyFormat(product.price)} /ud</span>
              </div>
            </div>
          </div>

          <div className="border-surface-highest flex items-center justify-between gap-4 border-t pt-3 sm:border-0 sm:pt-0">
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
            />

            <div className="flex items-center space-x-3">
              <span className={`${titleFont.className} text-primary-fixed text-lg font-extrabold`}>
                {currencyFormat(product.price * product.quantity)}
              </span>

              <button
                onClick={() => removeProduct(product)}
                className="border-surface-highest text-on-surface-variant flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:border-red-500 hover:bg-red-950/40 hover:text-red-400"
                aria-label="Eliminar producto"
              >
                <IoTrashOutline className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
