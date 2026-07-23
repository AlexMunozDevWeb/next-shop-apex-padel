'use client'
import { useSyncExternalStore } from 'react'

import { mainFont } from '@/modules/config/fonts'
import Link from 'next/link'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'
import { useCartStore, useUIStore } from '@/modules/store'

export const TopMenu = () => {
  const openMenu = useUIStore((state) => state.openSideMenu)
  const totalItemsInCart = useCartStore((state) => state.getTotalItems())

  const loaded = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  return (
    <nav className={`${mainFont.className} flex w-full items-center justify-between px-5`}>
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${mainFont.className} font-bold antialiased`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menú */}
      <div className="hidden sm:block">
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Niños
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link
          href="/search"
          className="mx-2"
        >
          <IoSearchOutline className="w-5" />
        </Link>
        <Link
          href={totalItemsInCart === 0 && loaded ? '/empty' : '/cart'}
          className="mx-2"
        >
          <div className="relative">
            {loaded && totalItemsInCart > 0 && (
              <span className="fade-in text-sx absolute -top-2 -right-2 rounded-full bg-blue-700 px-1 font-bold text-white">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="w-5" />
          </div>
        </Link>

        <button
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          onClick={openMenu}
        >
          Menú
        </button>
      </div>
    </nav>
  )
}
