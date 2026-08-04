'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5'

import { useUIStore } from '@/modules/store'
import { logout } from '@/modules/auth/controller/authActions'
import { titleFont } from '@/modules/config/fonts'

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen)
  const closeMenu = useUIStore((state) => state.closeSideMenu)

  const { data: session } = useSession()

  const isAuthenticated = !!session?.user
  const isAdmin = session?.user.role === 'admin'

  return (
    <div>
      {/* Dark Backdrop */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed inset-0 z-50 bg-black/70 backdrop-blur-md transition-opacity"
        />
      )}

      {/* Sidemenu Drawer */}
      <nav
        className={clsx(
          'border-surface-highest bg-surface-lowest text-on-surface fixed top-0 right-0 z-50 flex h-screen w-full max-w-sm flex-col justify-between border-l p-6 shadow-2xl transition-transform duration-300 ease-in-out',
          {
            'translate-x-full': !isSideMenuOpen,
          }
        )}
      >
        <div>
          {/* Header */}
          <div className="border-surface-highest flex items-center justify-between border-b pb-5">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center space-x-2"
            >
              <div className="bg-primary-fixed text-on-primary-fixed flex h-7 w-7 items-center justify-center rounded">
                <span className={`${titleFont.className} text-sm font-black`}>A</span>
              </div>
              <span className={`${titleFont.className} text-base font-extrabold tracking-tight text-white`}>
                APEX <span className="text-primary-fixed">STORE</span>
              </span>
            </Link>

            <button
              onClick={() => closeMenu()}
              className="border-surface-highest flex h-9 w-9 items-center justify-center rounded-lg border text-neutral-400 transition-colors hover:text-white"
              aria-label="Cerrar"
            >
              <IoCloseOutline className="h-6 w-6" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mt-6">
            <IoSearchOutline className="text-on-surface-variant absolute top-3.5 left-3.5 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar palas, calzado, ropa..."
              className="border-surface-highest bg-surface-low text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed w-full rounded-xl border py-2.5 pr-4 pl-10 text-xs focus:outline-none"
            />
          </div>

          {/* Navigation Links */}
          <div className="mt-8 space-y-6">
            <div>
              <span className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
                Categorías
              </span>
              <div className="mt-2 flex flex-col space-y-1">
                <Link
                  href="/gender/men"
                  onClick={closeMenu}
                  className="text-primary-fixed hover:bg-surface-container rounded-lg px-3 py-2 text-base font-extrabold transition-all"
                >
                  Hombre
                </Link>
                <Link
                  href="/gender/women"
                  onClick={closeMenu}
                  className="text-on-surface hover:bg-surface-container hover:text-primary-fixed rounded-lg px-3 py-2 text-base font-extrabold transition-all"
                >
                  Mujer
                </Link>
                <Link
                  href="/gender/kid"
                  onClick={closeMenu}
                  className="text-on-surface hover:bg-surface-container hover:text-primary-fixed rounded-lg px-3 py-2 text-base font-extrabold transition-all"
                >
                  Junior
                </Link>
              </div>
            </div>

            <div className="border-surface-highest border-t pt-4">
              <span className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
                Usuario
              </span>
              <div className="mt-2 flex flex-col space-y-1">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      className="text-on-surface hover:bg-surface-container hover:text-primary-fixed flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all"
                      onClick={closeMenu}
                    >
                      <IoPersonOutline className="h-5 w-5" />
                      <span>Mi Cuenta</span>
                    </Link>

                    <Link
                      href="/orders"
                      onClick={closeMenu}
                      className="text-on-surface hover:bg-surface-container hover:text-primary-fixed flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all"
                    >
                      <IoTicketOutline className="h-5 w-5" />
                      <span>Mis Pedidos</span>
                    </Link>

                    <button
                      className="flex w-full items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-400 transition-all hover:bg-red-950/40"
                      onClick={() => {
                        closeMenu()
                        logout()
                      }}
                    >
                      <IoLogOutOutline className="h-5 w-5" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    className="bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed/90 flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-extrabold transition-all"
                    onClick={closeMenu}
                  >
                    <IoLogInOutline className="h-5 w-5" />
                    <span>Iniciar Sesión</span>
                  </Link>
                )}

                {isAdmin && (
                  <>
                    <div className="border-surface-highest my-3 border-t" />
                    <span className="text-primary-fixed text-[10px] font-extrabold tracking-widest uppercase">
                      Administración
                    </span>

                    <Link
                      href="/admin/products"
                      onClick={closeMenu}
                      className="text-on-surface hover:bg-surface-container flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all"
                    >
                      <IoShirtOutline className="h-5 w-5" />
                      <span>Productos</span>
                    </Link>

                    <Link
                      href="/admin/orders"
                      onClick={closeMenu}
                      className="text-on-surface hover:bg-surface-container flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all"
                    >
                      <IoTicketOutline className="h-5 w-5" />
                      <span>Pedidos</span>
                    </Link>

                    <Link
                      href="/admin/users"
                      onClick={closeMenu}
                      className="text-on-surface hover:bg-surface-container flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all"
                    >
                      <IoPeopleOutline className="h-5 w-5" />
                      <span>Usuarios</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-surface-highest text-on-surface-variant border-t pt-4 text-center text-xs">
          Apex Padel Store v2.0 • Pro Performance
        </div>
      </nav>
    </div>
  )
}
