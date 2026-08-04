'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'

import { createUpdateProduct, deleteProductImage } from '@/modules/products/controller/productActions'
import { Product, ProductImage as ProductWithImage } from '@/modules/products/domain'
import type { Category } from '@/modules/category/domain'
import { ProductImage } from '@/modules/products/ui/components'

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] }
  categories: Category[]
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

interface FormInputs {
  title: string
  slug: string
  description: string
  price: number
  inStock: number
  sizes: string[]
  tags: string
  gender: 'men' | 'women' | 'kid' | 'unisex'
  categoryId: string

  images?: FileList
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(', '),
      sizes: product.sizes ?? [],

      images: undefined,
    },
  })

  watch('sizes')

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues('sizes'))
    sizes.has(size) ? sizes.delete(size) : sizes.add(size)
    setValue('sizes', Array.from(sizes))
  }

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData()
    const { images, ...productToSave } = data

    if (product.id) {
      formData.append('id', product.id ?? '')
    }

    formData.append('title', productToSave.title)
    formData.append('slug', productToSave.slug)
    formData.append('description', productToSave.description)
    formData.append('price', productToSave.price.toString())
    formData.append('inStock', productToSave.inStock.toString())
    formData.append('sizes', productToSave.sizes.toString())
    formData.append('tags', productToSave.tags)
    formData.append('categoryId', productToSave.categoryId)
    formData.append('gender', productToSave.gender)

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData)

    if (!ok) {
      alert('El producto no se pudo actualizar')
      return
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-2xl border border-[#e3e2e7] bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column: Product Information */}
        <div className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold tracking-wider text-[#4c4546] uppercase">Título del Producto</label>
            <input
              type="text"
              placeholder="Ej. Pala Apex Pro Carbon 2026"
              className="rounded-lg border border-[#e3e2e7] bg-white p-2.5 text-sm text-[#1a1b1f] transition-colors focus:border-black focus:outline-none"
              {...register('title', { required: true })}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold tracking-wider text-[#4c4546] uppercase">Slug URL</label>
            <input
              type="text"
              placeholder="pala-apex-pro-carbon-2026"
              className="rounded-lg border border-[#e3e2e7] bg-white p-2.5 text-sm text-[#1a1b1f] transition-colors focus:border-black focus:outline-none"
              {...register('slug', { required: true })}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold tracking-wider text-[#4c4546] uppercase">Descripción</label>
            <textarea
              rows={5}
              placeholder="Detalles técnicos y especificaciones..."
              className="rounded-lg border border-[#e3e2e7] bg-white p-2.5 text-sm text-[#1a1b1f] transition-colors focus:border-black focus:outline-none"
              {...register('description', { required: true })}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-[#4c4546] uppercase">Precio (€)</label>
              <input
                type="number"
                step="0.01"
                placeholder="249.99"
                className="rounded-lg border border-[#e3e2e7] bg-white p-2.5 text-sm text-[#1a1b1f] transition-colors focus:border-black focus:outline-none"
                {...register('price', { required: true, min: 0 })}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-[#4c4546] uppercase">Etiquetas (Tags)</label>
              <input
                type="text"
                placeholder="palas, pro, carbon"
                className="rounded-lg border border-[#e3e2e7] bg-white p-2.5 text-sm text-[#1a1b1f] transition-colors focus:border-black focus:outline-none"
                {...register('tags', { required: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-[#4c4546] uppercase">Género / Categoría</label>
              <select
                className="rounded-lg border border-[#e3e2e7] bg-white p-2.5 text-sm text-[#1a1b1f] transition-colors focus:border-black focus:outline-none"
                {...register('gender', { required: true })}
              >
                <option value="">[Seleccione]</option>
                <option value="men">Hombre</option>
                <option value="women">Mujer</option>
                <option value="kid">Junior</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-[#4c4546] uppercase">Tipo de Producto</label>
              <select
                className="rounded-lg border border-[#e3e2e7] bg-white p-2.5 text-sm text-[#1a1b1f] transition-colors focus:border-black focus:outline-none"
                {...register('categoryId', { required: true })}
              >
                <option value="">[Seleccione]</option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Inventory & Images */}
        <div className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold tracking-wider text-[#4c4546] uppercase">Inventario en Stock</label>
            <input
              type="number"
              placeholder="10"
              className="rounded-lg border border-[#e3e2e7] bg-white p-2.5 text-sm text-[#1a1b1f] transition-colors focus:border-black focus:outline-none"
              {...register('inStock', { required: true, min: 0 })}
            />
          </div>

          {/* Sizes Selection */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold tracking-wider text-[#4c4546] uppercase">Tallas Disponibles</label>
            <div className="flex flex-wrap gap-2 pt-1">
              {sizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => onSizeChanged(size)}
                  className={clsx(
                    'flex h-10 min-w-[42px] cursor-pointer items-center justify-center rounded-lg border text-xs font-bold transition-all',
                    {
                      'border-black bg-black text-[#c1f100] shadow-sm': getValues('sizes').includes(size),
                      'border-[#e3e2e7] bg-white text-[#1a1b1f] hover:border-black': !getValues('sizes').includes(size),
                    }
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col space-y-1.5 pt-2">
            <label className="text-xs font-bold tracking-wider text-[#4c4546] uppercase">
              Subir Imágenes de Producto
            </label>
            <input
              type="file"
              {...register('images')}
              multiple
              className="rounded-lg border border-[#e3e2e7] bg-[#f4f3f8] p-2.5 text-xs text-[#1a1b1f]"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3">
            {product.ProductImage?.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-xl border border-[#e3e2e7] bg-white"
              >
                <div className="h-28 w-full bg-[#f4f3f8]">
                  <ProductImage
                    alt={product.title ?? ''}
                    src={image.url}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => deleteProductImage(image.id, image.url)}
                  className="w-full bg-red-600 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#f4f3f8] pt-4">
        <button
          type="submit"
          className="btn-primary w-full py-3.5 text-xs tracking-wider uppercase"
        >
          Guardar Cambios de Producto
        </button>
      </div>
    </form>
  )
}
