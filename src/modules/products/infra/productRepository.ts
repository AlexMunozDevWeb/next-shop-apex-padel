import { prisma } from '@/modules/shared/lib/prisma'
import { v2 as cloudinary } from 'cloudinary'
import { Gender, Product, Size } from '@/generated/prisma/client'
import { iProductRepository } from './iProductRepository'

cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export const productRepository: iProductRepository = {
  createUpdateProduct: async (formData) => {
    const data = Object.fromEntries(formData)

    const id = data.id as string | undefined
    const title = data.title as string
    let slug = data.slug as string
    const description = data.description as string
    const price = Number(data.price)
    const inStock = Number(data.inStock)
    const categoryId = data.categoryId as string
    const sizes = (data.sizes as string).split(',')
    const tags = data.tags as string
    const gender = data.gender as Gender

    slug = slug.toLowerCase().replace(/ /g, '-').trim()

    try {
      const prismaTx = await prisma.$transaction(async (tx) => {
        let product: Product
        const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

        if (id) {
          product = await prisma.product.update({
            where: { id },
            data: {
              title,
              slug,
              description,
              price,
              inStock,
              categoryId,
              sizes: { set: sizes as Size[] },
              tags: { set: tagsArray },
              gender,
            },
          })
        } else {
          product = await prisma.product.create({
            data: {
              title,
              slug,
              description,
              price,
              inStock,
              categoryId,
              sizes: { set: sizes as Size[] },
              tags: { set: tagsArray },
              gender,
            },
          })
        }

        if (formData.getAll('images')) {
          const images = await uploadImages(formData.getAll('images') as File[])
          if (!images) {
            throw new Error('No se pudo cargar las imágenes, rollingback')
          }

          await prisma.productImage.createMany({
            data: images.map((image) => ({
              url: image!,
              productId: product.id,
            })),
          })
        }

        return { product }
      })

      return { ok: true, product: prismaTx.product, slug }
    } catch (error) {
      return { ok: false, message: 'Revisar los logs, no se pudo actualizar/crear' }
    }
  },

  deleteProductImage: async (imageId, imageUrl) => {
    if (!imageUrl.startsWith('http')) {
      return { ok: false, error: 'No se pueden borrar imagenes de FS' }
    }

    const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? ''

    try {
      await cloudinary.uploader.destroy(imageName)
      const deletedImage = await prisma.productImage.delete({
        where: { id: imageId },
        select: {
          product: { select: { slug: true } },
        },
      })

      return { ok: true, slug: deletedImage.product.slug }
    } catch (error) {
      console.log(error)
      return { ok: false, message: 'No se pudo eliminar la imagen' }
    }
  },

  getProductBySlug: async (slug) => {
    try {
      const product = await prisma.product.findFirst({
        include: {
          ProductImage: { select: { id: true, url: true, productId: true } },
        },
        where: { slug },
      })

      if (!product) return null

      return {
        ...product,
        images: product.ProductImage.map((image) => image.url),
      }
    } catch (error) {
      console.log(error)
      throw new Error('Error al obtener producto por slug')
    }
  },

  getStockBySlug: async (slug) => {
    try {
      const stock = await prisma.product.findFirst({
        select: { inStock: true },
        where: { slug },
      })

      return stock?.inStock ?? 0
    } catch (error) {
      throw new Error(`Error al obtener producto por slug: ${error}`)
    }
  },

  getPaginatedProductWithImages: async ({ page, take, gender }) => {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: { take: 2, select: { url: true } },
      },
      where: { gender },
    })

    const totalCount = await prisma.product.count({ where: { gender } })
    const totalPages = Math.ceil(totalCount / take)

    return {
      currtentPage: page,
      totalPages,
      products: products.map(({ ProductImage, ...product }) => ({
        ...product,
        images: ProductImage.map((image) => image.url),
      })),
    }
  },
}

const uploadImages = async (images: File[]): Promise<(string | null)[]> => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')
        return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`).then((r) => r.secure_url)
      } catch (error) {
        console.log(error)
        return null
      }
    })

    return await Promise.all(uploadPromises)
  } catch (error) {
    console.log(error)
    return []
  }
}
