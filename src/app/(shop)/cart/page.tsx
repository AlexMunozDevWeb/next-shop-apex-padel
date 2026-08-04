import Link from 'next/link'
import { ProductsInCart } from './ui/ProductsInCart'
import { OrderSummary } from './ui/OrderSummary'
import { titleFont } from '@/modules/config/fonts'
import { IoArrowBackOutline, IoLockClosedOutline } from 'react-icons/io5'

export default function CartPage() {
  return (
    <div className="app-container space-y-8 pb-16">
      {/* Progress Stepper - Identical to Stitch Screen */}
      <div className="border-surface-highest/50 flex items-center justify-between border-b pb-4">
        <div className="flex flex-col gap-1">
          <span className="text-primary-fixed text-[10px] font-extrabold tracking-widest uppercase">PASO 01 DE 03</span>
          <h1 className={`${titleFont.className} text-2xl font-black text-white sm:text-3xl`}>Tu Selección</h1>
        </div>

        <div className="flex gap-2">
          <div className="bg-primary-fixed h-1.5 w-8 rounded-full" />
          <div className="bg-surface-highest h-1.5 w-8 rounded-full" />
          <div className="bg-surface-highest h-1.5 w-8 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Cart Items List (Left Column) */}
        <div className="space-y-6 lg:col-span-7">
          <ProductsInCart />

          <div className="pt-2">
            <Link
              href="/"
              className="text-on-surface-variant hover:text-primary-fixed inline-flex items-center space-x-2 text-xs font-extrabold tracking-wider uppercase transition-colors"
            >
              <IoArrowBackOutline className="h-4 w-4" />
              <span>Continuar Comprando</span>
            </Link>
          </div>
        </div>

        {/* Promo Code & Order Summary (Right Column) */}
        <div className="space-y-6 lg:col-span-5">
          {/* Promo Code Section */}
          <div className="border-surface-highest bg-surface-low space-y-2 rounded-2xl border p-5">
            <label className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
              Código de Descuento
            </label>
            <div className="flex gap-2">
              <input
                className="border-surface-highest bg-surface-high text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed flex-1 rounded-xl border px-4 py-2.5 text-xs focus:outline-none"
                placeholder="Ej. APEX2026"
                type="text"
              />
              <button className="bg-surface-highest hover:bg-surface-highest/80 rounded-xl px-5 text-xs font-bold text-white transition-colors">
                Aplicar
              </button>
            </div>
          </div>

          {/* Summary Card */}
          <div className="border-surface-highest bg-surface-container space-y-6 rounded-2xl border p-6 shadow-xl">
            <h2 className={`${titleFont.className} border-surface-highest border-b pb-3 text-lg font-black text-white`}>
              Resumen de Pedido
            </h2>

            <OrderSummary />

            <div className="pt-2">
              <Link
                className="btn-primary w-full py-4 text-center text-xs tracking-wider uppercase shadow-xl"
                href="/checkout/address"
              >
                PROCEDER AL CHECKOUT
              </Link>
            </div>

            <div className="text-on-surface-variant flex items-center justify-center space-x-2 text-[11px]">
              <IoLockClosedOutline className="text-primary-fixed h-4 w-4" />
              <span>Transacción 100% Encriptada y Segura</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
