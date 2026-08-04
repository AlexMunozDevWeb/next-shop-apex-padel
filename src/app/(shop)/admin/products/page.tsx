export const revalidate = 0

import { getPaginatedProductWithImages } from '@/modules/products/controller/productActions'
import { Pagination, Title } from '@/modules/shared/ui/components'
import { ProductImage } from '@/modules/products/ui/components'
import { currencyFormat } from '@/modules/shared/ui/utils'
import Link from 'next/link'
import { IoAddOutline } from 'react-icons/io5'

interface Props {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function AdminProductsPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const page = pageParam ? parseInt(pageParam) : 1

  const { products, totalPages } = await getPaginatedProductWithImages({ page })

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Title
          title="Gestión de Productos"
          subtitle="Mantenimiento de catálogo, inventario y especificaciones técnicas."
          className="my-0"
        />

        <Link
          href="/admin/product/new"
          className="btn-primary inline-flex items-center space-x-1.5 text-xs tracking-wider uppercase"
        >
          <IoAddOutline className="h-4 w-4" />
          <span>Nuevo Producto</span>
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e3e2e7] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#e3e2e7] bg-[#f4f3f8] tracking-wider text-[#4c4546] uppercase">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-extrabold"
                >
                  Imagen
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-extrabold"
                >
                  Título
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-extrabold"
                >
                  Precio
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-extrabold"
                >
                  Género
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-extrabold"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-extrabold"
                >
                  Tallas
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4f3f8]">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="transition-colors hover:bg-[#faf8fe]"
                >
                  <td className="px-6 py-3">
                    <Link href={`/product/${product.slug}`}>
                      <div className="h-14 w-14 overflow-hidden rounded-lg border border-[#e3e2e7] bg-[#f4f3f8]">
                        <ProductImage
                          src={product.images[0]}
                          width={60}
                          height={60}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-bold text-[#1a1b1f]">
                    <Link
                      href={`/admin/product/${product.slug}`}
                      className="hover:underline"
                    >
                      {product.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-extrabold text-[#1a1b1f]">{currencyFormat(product.price)}</td>
                  <td className="px-6 py-4 font-semibold text-[#4c4546] uppercase">{product.gender}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${
                        product.inStock > 5
                          ? 'border border-[#c1f100]/40 bg-[#c1f100]/20 text-black'
                          : 'border border-red-200 bg-red-100 text-red-700'
                      }`}
                    >
                      {product.inStock} uds
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-[#4c4546]">{product.sizes.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  )
}
