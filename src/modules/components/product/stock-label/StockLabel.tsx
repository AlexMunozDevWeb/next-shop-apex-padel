'use client'
import { mainFont } from '@/modules/config/fonts'
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

  return (
    <>
      {isLoading ? (
        <h1 className={`${mainFont.className} animate-pulse bg-gray-100 text-lg font-bold antialiased`}>&nbsp;</h1>
      ) : (
        <h1 className={`${mainFont.className} text-lg font-bold antialiased`}>Stock: {stock}</h1>
      )}
    </>
  )
}
