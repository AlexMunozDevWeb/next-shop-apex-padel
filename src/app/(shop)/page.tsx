export const revalidate = 60 // 60 segundos

import { getPaginatedProductWithImages } from '@/modules/products/controller/productActions'
import { redirect } from 'next/navigation'
import { ProductGrid, Title, Pagination } from '@/modules/components'

interface Props {
  searchParams: Promise<{
    page?: string
  }>
}
export default async function Home({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const page = pageParam ? parseInt(pageParam) : 1

  const { products, currtentPage, totalPages } = await getPaginatedProductWithImages({ page })

  if (products.length === 0) {
    redirect('/')
  }

  return (
    <div>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </div>
  )
}
