import Link from 'next/link'
import { ProductsInCart } from './ui/ProductsInCart'
import { PlaceOrder } from './ui/PlaceOrder'
import { titleFont } from '@/modules/config/fonts'
import { IoPencilOutline } from 'react-icons/io5'

export default function CheckoutPage() {
  return (
    <div className="app-container space-y-8 pb-16">
      {/* Progress Stepper */}
      <div className="border-surface-highest/50 flex items-center justify-between border-b pb-4">
        <div className="flex flex-col gap-1">
          <span className="text-primary-fixed text-[10px] font-extrabold tracking-widest uppercase">PASO 03 DE 03</span>
          <h1 className={`${titleFont.className} text-2xl font-black text-white sm:text-3xl`}>Verificar Pedido</h1>
        </div>

        <div className="flex gap-2">
          <div className="bg-primary-fixed h-1.5 w-8 rounded-full" />
          <div className="bg-primary-fixed h-1.5 w-8 rounded-full" />
          <div className="bg-primary-fixed h-1.5 w-8 rounded-full" />
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          href="/cart"
          className="border-surface-highest bg-surface-low text-on-surface hover:border-primary-fixed hover:text-primary-fixed inline-flex items-center space-x-1.5 rounded-xl border px-4 py-2 text-xs font-bold transition-all"
        >
          <IoPencilOutline className="h-4 w-4" />
          <span>Editar Carrito</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ProductsInCart />
        </div>

        <div className="lg:col-span-5">
          <PlaceOrder />
        </div>
      </div>
    </div>
  )
}
