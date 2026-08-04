import { getProductoBySlug } from '@/modules/products/controller/productActions'
import { Title } from '@/modules/shared/ui/components'
import { redirect } from 'next/navigation'
import { ProductForm } from './ui/ProductForm'
import { implementCategoryController } from '@/modules/category/controller/categoryController'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params

  const { getCategories } = implementCategoryController()

  const [product, categories] = await Promise.all([getProductoBySlug(slug), getCategories({ orderBy: 'asc' })])

  if (!product && slug !== 'new') {
    redirect('/admin/products')
  }

  const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto'

  return (
    <>
      <Title
        className=""
        title={title}
      />

      <ProductForm
        product={product ?? {}}
        categories={categories}
      />
    </>
  )
}
