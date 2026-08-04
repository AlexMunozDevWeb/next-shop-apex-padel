export const revalidate = 60

import { getPaginatedProductWithImages } from '@/modules/products/controller/productActions'
import { redirect } from 'next/navigation'
import { Gender } from '@/generated/prisma/enums'
import { Pagination } from '@/modules/shared/ui/components'
import { ProductGrid } from '@/modules/products/ui/components'
import { titleFont } from '@/modules/config/fonts'

interface Props {
  params: Promise<{
    gender: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

export default async function CategoryIdPage({ params, searchParams }: Props) {
  const { gender } = await params
  const { page: pageParam } = await searchParams
  const page = pageParam ? parseInt(pageParam) : 1

  const { products, currentPage, totalPages } = await getPaginatedProductWithImages({
    page,
    gender: gender as Gender,
  })

  if (products.length === 0 && page > 1) {
    redirect(`/gender/${gender}`)
  }

  const categoryMeta: Record<string, { title: string; subtitle: string; bgImage: string; tag: string }> = {
    men: {
      title: 'Colección Hombre',
      subtitle: 'Potencia, precisión y estilo técnico diseñado para el juego de alto rendimiento.',
      bgImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200',
      tag: 'TEMPORADA 2026',
    },
    women: {
      title: 'Colección Mujer',
      subtitle: 'Equipamiento de máxima ligereza, ergonomía y control profesional.',
      bgImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200',
      tag: 'PRO WOMEN 2026',
    },
    kid: {
      title: 'Colección Junior',
      subtitle: 'Material técnico ligero y adaptado para futuras promesas del pádel.',
      bgImage: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&q=80&w=1200',
      tag: 'FUTURE ACADEMY',
    },
    unisex: {
      title: 'Colección Unisex',
      subtitle: 'Accesorios y equipación técnica universal para todos los jugadores.',
      bgImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1200',
      tag: 'UNIVERSAL EQUIPMENT',
    },
  }

  const currentMeta = categoryMeta[gender] || {
    title: 'Catálogo de Productos',
    subtitle: 'Equipamiento técnico Apex Padel de grado torneo.',
    bgImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1200',
    tag: 'APEX STORE',
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Category Dynamic Hero Section */}
      <section className="category-hero-height bg-surface-low relative w-full overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${currentMeta.bgImage}')` }}
        />
        <div className="from-surface via-surface/60 absolute inset-0 bg-gradient-to-t to-transparent" />
        <div className="from-surface via-surface/70 absolute inset-0 bg-gradient-to-r to-transparent" />

        <div className="app-container absolute right-0 bottom-0 left-0 p-6 sm:p-10">
          <span className="bg-primary-fixed text-on-primary-fixed inline-block rounded-full px-3 py-1 text-[10px] font-extrabold tracking-widest uppercase">
            {currentMeta.tag}
          </span>
          <h1 className={`${titleFont.className} mt-2 text-3xl font-black text-white sm:text-5xl`}>
            {currentMeta.title}
          </h1>
          <p className="text-on-surface-variant mt-1 max-w-xl text-xs font-medium sm:text-sm">{currentMeta.subtitle}</p>
        </div>
      </section>

      {/* Main Container Standardized Width */}
      <div className="app-container space-y-8">
        {/* Horizontal Category Filters */}
        <div className="no-scrollbar flex items-center space-x-2 overflow-x-auto pb-2">
          <button className="bg-primary-fixed text-on-primary-fixed flex-none rounded-full px-5 py-2 text-xs font-extrabold">
            Todo
          </button>
          <button className="border-surface-highest bg-surface-container text-on-surface hover:border-primary-fixed flex-none rounded-full border px-5 py-2 text-xs font-extrabold">
            Palas
          </button>
          <button className="border-surface-highest bg-surface-container text-on-surface hover:border-primary-fixed flex-none rounded-full border px-5 py-2 text-xs font-extrabold">
            Zapatillas
          </button>
          <button className="border-surface-highest bg-surface-container text-on-surface hover:border-primary-fixed flex-none rounded-full border px-5 py-2 text-xs font-extrabold">
            Textil
          </button>
          <button className="border-surface-highest bg-surface-container text-on-surface hover:border-primary-fixed flex-none rounded-full border px-5 py-2 text-xs font-extrabold">
            Accesorios
          </button>
        </div>

        {/* Product Catalog Grid */}
        <ProductGrid products={products} />

        {/* Pagination */}
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
