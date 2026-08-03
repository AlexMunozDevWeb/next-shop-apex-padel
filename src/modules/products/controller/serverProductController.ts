import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { Gender } from '@/generated/prisma/client'
import type { PaginatedProductsResult, ProductResult, ProductWithImages } from '../domain'
import { iProductRepository, productRepository } from '../infra'

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
})

export interface iProductController {
  createUpdateProduct: (formData: FormData) => Promise<ProductResult>
  deleteProductImage: (imageId: number, imageUrl: string) => Promise<{ ok: boolean; message?: string; error?: string }>
  getProductBySlug: (slug: string) => Promise<ProductWithImages | null>
  getStockBySlug: (slug: string) => Promise<number>
  getPaginatedProductWithImages: (options: {
    page?: number
    take?: number
    gender?: Gender
  }) => Promise<PaginatedProductsResult>
}

const ProductController = (repo: iProductRepository): iProductController => ({
  createUpdateProduct: async (formData) => {
    const data = Object.fromEntries(formData)
    const productParsed = productSchema.safeParse(data)

    if (!productParsed.success) {
      console.log(productParsed.error)
      return { ok: false }
    }

    const result = await repo.createUpdateProduct(formData)

    if (result.ok && result.slug) {
      revalidatePath('/admin/products')
      revalidatePath(`/admin/product/${result.slug}`)
      revalidatePath(`/products/${result.slug}`)
    }

    return result
  },

  deleteProductImage: async (imageId, imageUrl) => {
    const result = await repo.deleteProductImage(imageId, imageUrl)

    if (result.ok && result.slug) {
      revalidatePath('/admin/products')
      revalidatePath(`/admin/product/${result.slug}`)
      revalidatePath(`/product/${result.slug}`)
    }

    return result
  },

  getProductBySlug: (slug) => repo.getProductBySlug(slug),

  getStockBySlug: (slug) => repo.getStockBySlug(slug),

  getPaginatedProductWithImages: ({ page = 1, take = 12, gender }) => {
    if (isNaN(Number(page))) page = 1
    if (page < 1) page = 1
    return repo.getPaginatedProductWithImages({ page, take, gender })
  },
})

export const serverProductController = (): iProductController => {
  return ProductController(productRepository)
}
