export const revalidate = 608400 // 7 días

import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { mainFont } from '@/modules/config/fonts'
import { ProductMobileSlideshow, ProductSlideshow, StockLabel } from '@/modules/components'
import { getProductoBySlug } from '@/modules/products/controller/productActions'
import { AddToCart } from './ui/AddToCart'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const slug = (await params).slug

  const product = await getProductoBySlug(slug)

  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/products/${product?.images[1]}`],
    },
  }
}

export default async function ProductIdPage({ params }: Props) {
  const { slug } = await params

  const product = await getProductoBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 gap-3 md:grid-cols-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        <h1 className={` ${mainFont.className} text-xl font-bold antialiased`}>{product.title}</h1>
        <p className="mb-5 text-lg">${product.price}</p>

        <AddToCart product={product} />

        {/* Descripción */}
        <h3 className="text-sm font-bold">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  )
}
