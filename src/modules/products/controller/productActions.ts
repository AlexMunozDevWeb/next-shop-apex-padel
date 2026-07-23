'use server'

import type { Gender } from '@/generated/prisma'
import { serverProductController } from './serverProductController'

export const createUpdateProduct = async (formData: FormData) => {
  return serverProductController().createUpdateProduct(formData)
}

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  return serverProductController().deleteProductImage(imageId, imageUrl)
}

export const getProductoBySlug = async (slug: string) => {
  return serverProductController().getProductBySlug(slug)
}

export const getStockBySlug = async (slug: string) => {
  return serverProductController().getStockBySlug(slug)
}

export const getPaginatedProductWithImages = async ({
  page,
  take,
  gender,
}: {
  page?: number
  take?: number
  gender?: Gender
}) => {
  return serverProductController().getPaginatedProductWithImages({ page, take, gender })
}
