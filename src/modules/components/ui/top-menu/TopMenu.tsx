'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { IoCartOutline, IoMenuOutline, IoSearchOutline } from 'react-icons/io5'
import { titleFont } from '@/modules/config/fonts'
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
    <header className="glass-panel-dark fixed top-0 z-50 w-full shadow-lg">
      <nav className="app-container flex h-16 items-center justify-between">
        {/* Left: Menu Trigger & Logo */}
        <div className="flex items-center space-x-3">
          <button
            className="text-on-surface hover:bg-surface-container flex h-11 w-11 items-center justify-center rounded-xl transition-colors"
            onClick={openMenu}
            aria-label="Abrir menú"
          >
            <IoMenuOutline className="h-6 w-6" />
          </button>

          <Link
            href="/"
            className="group flex items-center space-x-2"
          >
            <div className="bg-primary-fixed text-on-primary-fixed flex h-8 w-8 items-center justify-center rounded-lg transition-transform group-hover:scale-105">
              <span className={`${titleFont.className} text-lg font-black tracking-tighter`}>A</span>
            </div>
            <span className={`${titleFont.className} text-lg font-extrabold tracking-tight text-white`}>
              APEX<span className="text-primary-fixed">PADEL</span>
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden items-center space-x-1 md:flex">
          <Link
            className="text-on-surface hover:text-primary-fixed rounded-lg px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors"
            href="/gender/men"
          >
            Hombre
          </Link>
          <Link
            className="text-on-surface hover:text-primary-fixed rounded-lg px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors"
            href="/gender/women"
          >
            Mujer
          </Link>
          <Link
            className="text-on-surface hover:text-primary-fixed rounded-lg px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors"
            href="/gender/kid"
          >
            Junior
          </Link>
        </div>

        {/* Right: Search & Cart */}
        <div className="flex items-center space-x-2">
          <Link
            href="/search"
            className="text-on-surface hover:bg-surface-container flex h-11 w-11 items-center justify-center rounded-xl transition-colors"
            aria-label="Buscar"
          >
            <IoSearchOutline className="h-5 w-5" />
          </Link>

          <Link
            href={totalItemsInCart === 0 && loaded ? '/empty' : '/cart'}
            className="text-on-surface hover:bg-surface-container relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors"
            aria-label="Carrito"
          >
            <IoCartOutline className="h-6 w-6" />
            {loaded && totalItemsInCart > 0 && (
              <span className="fade-in bg-primary-fixed text-on-primary-fixed absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-black shadow-md">
                {totalItemsInCart}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  )
}
