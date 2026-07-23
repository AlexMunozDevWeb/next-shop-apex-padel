export const revalidate = 60 // 60 segundos

import { getPaginatedProductWithImages } from '@/modules/products/controller/productActions'
import { redirect } from 'next/navigation'
import { Gender } from '@/generated/prisma/enums'
import { Pagination, ProductGrid, Title } from '@/modules/components'

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

  const { products, currtentPage, totalPages } = await getPaginatedProductWithImages({ page, gender: gender as Gender })

  if (products.length === 0) {
    redirect(`/gender${gender}`)
  }

  const labels: Record<string, string> = {
    men: 'para hombres',
    women: 'para mujeres',
    kid: 'para niños',
    unisex: 'para todos',
  }

  return (
    <>
      <Title
        title={`Artículos ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  )
}
