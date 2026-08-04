'use client'

import { useEffect, useState } from 'react'
import { getStockBySlug } from '@/modules/products/controller/productActions'

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getStock = async () => {
      const inStock = await getStockBySlug(slug)
      setStock(inStock)
      setIsLoading(false)
    }
    getStock()
  }, [slug])

  if (isLoading) {
    return <div className="h-6 w-28 animate-pulse rounded-md bg-[#eeedf3]" />
  }

  return (
    <div className="inline-flex items-center space-x-2">
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
            stock > 0 ? 'bg-[#506600]' : 'bg-red-400'
          }`}
        />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${stock > 0 ? 'bg-[#506600]' : 'bg-red-500'}`} />
      </span>
      <span className="text-xs font-semibold text-[#4c4546]">
        {stock > 0 ? `Stock Disponible: ${stock} unidades` : 'Agotado Temporalmente'}
      </span>
    </div>
  )
}
