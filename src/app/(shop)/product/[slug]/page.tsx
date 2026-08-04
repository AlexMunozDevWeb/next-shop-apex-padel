export const revalidate = 608400 // 7 días

import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { titleFont } from '@/modules/config/fonts'
import { ProductMobileSlideshow, ProductSlideshow } from '@/modules/products/ui/components'
import { getProductoBySlug } from '@/modules/products/controller/productActions'
import { AddToCart } from '../../../../modules/products/ui/components/product/AddToCart'
import { IoArrowBackOutline, IoStar } from 'react-icons/io5'
import Link from 'next/link'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const slug = (await params).slug
  const product = await getProductoBySlug(slug)

  return {
    title: product ? `${product.title} | Apex Padel` : 'Producto | Apex Padel',
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: product?.images[1] ? [`/products/${product.images[1]}`] : [],
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
    <div className="app-container space-y-8 pb-16">
      {/* Top Header / Navigation */}
      <div className="border-surface-highest/50 flex items-center space-x-4 border-b pb-4">
        <Link
          href="/"
          className="bg-surface-container text-on-surface hover:bg-surface-highest flex h-10 w-10 items-center justify-center rounded-xl transition-colors"
          aria-label="Volver"
        >
          <IoArrowBackOutline className="h-5 w-5" />
        </Link>
        <div className="text-on-surface-variant flex items-center space-x-2 text-xs font-semibold">
          <Link
            href="/"
            className="hover:text-white"
          >
            Inicio
          </Link>
          <span>/</span>
          <span className="text-white uppercase">{product.gender}</span>
          <span>/</span>
          <span className="text-primary-fixed line-clamp-1">{product.title}</span>
        </div>
      </div>

      {/* Main Grid: Gallery Left, Details Right */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Column: Interactive Image Gallery */}
        <div className="lg:col-span-7">
          <div className="border-surface-highest bg-surface-low relative overflow-hidden rounded-2xl border p-4 shadow-xl">
            {/* Floating Badge */}
            <div className="bg-primary-fixed text-on-primary-fixed absolute top-6 left-6 z-10 rounded-full px-3.5 py-1 text-xs font-black tracking-wider uppercase shadow-md">
              Pro Series 2026
            </div>

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
        </div>

        {/* Right Column: Info & Buy Options */}
        <div className="flex flex-col space-y-6 lg:col-span-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-on-surface-variant text-xs font-extrabold tracking-widest uppercase">
                Apex Pro Equipment
              </span>

              {/* Star Rating Badge */}
              <div className="bg-surface-high flex items-center space-x-1.5 rounded-full px-3 py-1 text-xs">
                <IoStar className="text-primary-fixed h-4 w-4" />
                <span className="font-extrabold text-white">4.9</span>
                <span className="text-on-surface-variant">(128)</span>
              </div>
            </div>

            <h1 className={`${titleFont.className} text-3xl font-black text-white sm:text-4xl`}>{product.title}</h1>

            <div className="flex items-baseline space-x-3 pt-2">
              <span className={`${titleFont.className} text-primary-fixed text-3xl font-black`}>
                {product.price.toFixed(2)} €
              </span>
              <span className="text-on-surface-variant text-xs">IVA e Impuestos incluidos</span>
            </div>
          </div>

          {/* Add to Cart Controls */}
          <AddToCart product={product} />

          {/* Technical Tabs / Description Card */}
          <div className="border-surface-highest bg-surface-container space-y-4 rounded-2xl border p-6">
            <h3 className={`${titleFont.className} text-primary-fixed text-sm font-extrabold tracking-wider uppercase`}>
              Especificaciones Técnicas
            </h3>
            <p className="text-on-surface-variant text-xs leading-relaxed">{product.description}</p>

            <div className="border-surface-highest grid grid-cols-2 gap-4 border-t pt-4 text-xs">
              <div>
                <span className="text-on-surface-variant block text-[10px] font-extrabold tracking-wider uppercase">
                  Núcleo
                </span>
                <span className="font-bold text-white">Carbon MultiEva 18K</span>
              </div>
              <div>
                <span className="text-on-surface-variant block text-[10px] font-extrabold tracking-wider uppercase">
                  Balance
                </span>
                <span className="font-bold text-white">Alto (Potencia Pro)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
