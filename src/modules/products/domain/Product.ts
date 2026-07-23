import type { Gender, Size as PrismaSize } from '@/generated/prisma'

export type Size = PrismaSize

export type PaginationOptions = {
  page?: number
  take?: number
  gender?: Gender
}

export type PaginatedProductsResult = {
  currtentPage: number
  totalPages: number
  products: ProductWithImages[]
}

export type ProductWithImages = {
  id: string
  title: string
  description: string
  inStock: number
  price: number
  sizes: PrismaSize[]
  slug: string
  tags: string[]
  gender: Gender
  categoryId: string
  images: string[]
}

export type ProductResult = {
  ok: boolean
  slug?: string
  product?: { id: string; slug: string }
  message?: string
}

export interface Product {
  id: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: PrismaSize[]
  slug: string
  tags: string[]
  title: string
  gender: Gender
}

export interface CartProduct {
  id: string
  slug: string
  title: string
  price: number
  quantity: number
  size: PrismaSize
  image: string
}

export interface ProductImage {
  id: number
  url: string
  productId: string
}

export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats'
