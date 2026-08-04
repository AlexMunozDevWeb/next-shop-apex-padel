'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/modules/products/domain'
import { titleFont } from '@/modules/config/fonts'
import { IoCartOutline } from 'react-icons/io5'

interface Props {
  product: Product
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(
    product.images && product.images.length > 0 ? product.images[0] : 'placeholder.jpg'
  )

  const hasSecondImage = product.images && product.images.length > 1

  return (
    <div className="fade-in group border-surface-highest/60 bg-surface-container hover:border-primary-fixed/50 flex flex-col overflow-hidden rounded-xl border shadow-md transition-all duration-300 hover:shadow-xl">
      {/* Image Container with Dark Surface Background */}
      <div className="bg-surface-low relative flex aspect-3/4 w-full items-center justify-center overflow-hidden p-4">
        {/* Floating Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-primary-fixed text-on-primary-fixed inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
            NUEVO
          </span>
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="block h-full w-full"
        >
          <Image
            src={`/products/${displayImage}`}
            alt={product.title}
            className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-110"
            width={500}
            height={500}
            onMouseEnter={() => hasSecondImage && setDisplayImage(product.images[1])}
            onMouseLeave={() => setDisplayImage(product.images[0])}
          />
        </Link>

        {/* Hover Quick Cart Action */}
        <Link
          href={`/product/${product.slug}`}
          className="hover:bg-primary-fixed absolute right-3 bottom-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          aria-label="Ver producto"
        >
          <IoCartOutline className="h-5 w-5" />
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <span className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
            {product.gender || 'Padel Equipment'}
          </span>
          <Link
            className={`${titleFont.className} text-on-surface hover:text-primary-fixed mt-0.5 line-clamp-1 block text-sm font-bold transition-colors`}
            href={`/product/${product.slug}`}
          >
            {product.title}
          </Link>
        </div>

        <div className="border-surface-highest/50 mt-3 flex items-baseline justify-between border-t pt-2.5">
          <span className={`${titleFont.className} text-primary-fixed text-lg font-extrabold`}>
            {product.price.toFixed(2)} €
          </span>
          <span className="text-on-surface-variant text-[10px] font-bold uppercase">Stock disponible</span>
        </div>
      </div>
    </div>
  )
}
