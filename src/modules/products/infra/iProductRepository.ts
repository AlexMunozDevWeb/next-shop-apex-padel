import type { Gender } from '@/generated/prisma'
import type { PaginatedProductsResult, ProductResult, ProductWithImages } from '../domain'

export interface iProductRepository {
  createUpdateProduct: (formData: FormData) => Promise<ProductResult>
  deleteProductImage: (
    imageId: number,
    imageUrl: string
  ) => Promise<{ ok: boolean; message?: string; error?: string; slug?: string }>
  getProductBySlug: (slug: string) => Promise<ProductWithImages | null>
  getStockBySlug: (slug: string) => Promise<number>
  getPaginatedProductWithImages: (options: {
    page: number
    take: number
    gender?: Gender
  }) => Promise<PaginatedProductsResult>
}
