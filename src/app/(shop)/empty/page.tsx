import Link from 'next/link'
import { IoCartOutline } from 'react-icons/io5'
import { titleFont } from '@/modules/config/fonts'

export default function EmptyPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#eeedf3] text-black">
        <IoCartOutline className="h-12 w-12" />
      </div>

      <div className="mt-6 max-w-md space-y-3">
        <h1 className={`${titleFont.className} text-2xl font-black text-[#1a1b1f] sm:text-3xl`}>
          Tu carrito está vacío
        </h1>
        <p className="text-xs leading-relaxed text-[#4c4546]">
          Explora nuestro catálogo de palas, equipación y accesorios de alto rendimiento Apex Padel para añadir
          productos.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="btn-primary text-sm tracking-wider uppercase"
          >
            Explorar Productos
          </Link>
        </div>
      </div>
    </div>
  )
}
