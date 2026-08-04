export const revalidate = 60

import { getPaginatedProductWithImages } from '@/modules/products/controller/productActions'
import { redirect } from 'next/navigation'
import { ProductGrid, Pagination } from '@/modules/components'
import { titleFont } from '@/modules/config/fonts'
import Link from 'next/link'
import {
  IoArrowForwardOutline,
  IoCubeOutline,
  IoHeadsetOutline,
  IoOpenOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5'

interface Props {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function Home({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const page = pageParam ? parseInt(pageParam) : 1

  const { products, totalPages } = await getPaginatedProductWithImages({ page })

  if (products.length === 0 && page > 1) {
    redirect('/')
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="hero-section-height bg-surface relative flex w-full items-center overflow-hidden px-4 py-16 sm:px-10">
        {/* Background Image & Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <div
            className="h-full w-full scale-105 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1600')",
            }}
          />
          <div className="from-surface via-surface/60 absolute inset-0 bg-gradient-to-t to-transparent" />
          <div className="from-surface via-surface/70 absolute inset-0 bg-gradient-to-r to-transparent" />
        </div>

        <div className="app-container relative z-10 w-full">
          <div className="max-w-xl space-y-5">
            <span className="bg-primary-fixed text-on-primary-fixed inline-block rounded-full px-3.5 py-1 text-xs font-extrabold tracking-wider uppercase shadow-lg">
              PRO PERFORMANCE
            </span>

            <h1
              className={`${titleFont.className} text-4xl leading-none font-black tracking-tight text-white drop-shadow-md sm:text-6xl`}
            >
              TODO PARA DOMINAR LA PISTA
            </h1>

            <p className="text-on-surface-variant text-sm leading-relaxed font-medium sm:text-base">
              Equípate con la tecnología de los campeones del World Padel Tour. Palas, calzado y textil de máximo nivel.
            </p>

            <div className="pt-2">
              <Link
                href="#novedades"
                className="btn-primary space-x-2 text-sm"
              >
                <span>COMPRAR AHORA</span>
                <IoArrowForwardOutline className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="app-container space-y-12">
        {/* Featured Categories Bento Grid */}
        <section className="space-y-6">
          <h2 className={`${titleFont.className} text-on-surface text-2xl font-extrabold`}>Explora el Juego</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Palas (Span 2) */}
            <Link
              href="/gender/men"
              className="group bg-surface-low relative col-span-1 min-h-56 overflow-hidden rounded-2xl shadow-xl sm:col-span-2"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1613918431208-674b488730a3?auto=format&fit=crop&q=80&w=1000')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className={`${titleFont.className} text-2xl font-black text-white`}>Palas Pro</span>
                <p className="text-primary-fixed text-xs font-semibold">Potencia y Control Máximo</p>
              </div>
            </Link>

            {/* Card 2: Calzado */}
            <Link
              href="/gender/women"
              className="group bg-surface-low relative col-span-1 min-h-56 overflow-hidden rounded-2xl shadow-xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className={`${titleFont.className} text-2xl font-black text-white`}>Calzado Elite</span>
                <p className="text-on-surface-variant text-xs font-semibold">Agarre en Pista</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Brands Scroll Bar */}
        <section className="border-surface-highest/50 bg-surface-low overflow-hidden rounded-2xl border px-6 py-6">
          <div className="text-on-surface flex flex-wrap items-center justify-around gap-6 text-lg font-black tracking-widest uppercase opacity-60">
            <span className="hover:text-primary-fixed cursor-pointer transition-all hover:opacity-100">BULLPADEL</span>
            <span className="hover:text-primary-fixed cursor-pointer transition-all hover:opacity-100">NOX</span>
            <span className="hover:text-primary-fixed cursor-pointer transition-all hover:opacity-100">HEAD</span>
            <span className="hover:text-primary-fixed cursor-pointer transition-all hover:opacity-100">ADIDAS</span>
            <span className="hover:text-primary-fixed cursor-pointer transition-all hover:opacity-100">BABOLAT</span>
          </div>
        </section>

        {/* Novedades Elite Section */}
        <section
          id="novedades"
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className={`${titleFont.className} text-on-surface text-2xl font-extrabold`}>Novedades Elite</h2>

            <Link
              href="/gender/men"
              className="text-primary-fixed flex items-center space-x-1 text-xs font-bold hover:underline"
            >
              <span>Ver todo</span>
              <IoOpenOutline className="h-3.5 w-3.5" />
            </Link>
          </div>

          <ProductGrid products={products} />

          <Pagination totalPages={totalPages} />
        </section>

        {/* Benefits Section */}
        <section className="border-surface-highest bg-surface-high rounded-2xl border p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex items-start space-x-4">
              <div className="bg-surface-highest text-primary-fixed flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
                <IoCubeOutline className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h4 className={`${titleFont.className} text-base font-bold text-white`}>Envío en 24/48h</h4>
                <p className="text-on-surface-variant text-xs">
                  Gratis en pedidos superiores a 60€. Envío asegurado express.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-surface-highest text-primary-fixed flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
                <IoShieldCheckmarkOutline className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h4 className={`${titleFont.className} text-base font-bold text-white`}>Garantía Oficial</h4>
                <p className="text-on-surface-variant text-xs">
                  Distribuidores autorizados de todas las marcas de pádel.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-surface-highest text-primary-fixed flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
                <IoHeadsetOutline className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h4 className={`${titleFont.className} text-base font-bold text-white`}>Asesoramiento Pro</h4>
                <p className="text-on-surface-variant text-xs">
                  Nuestros expertos te ayudan a elegir la pala ideal para tu juego.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
