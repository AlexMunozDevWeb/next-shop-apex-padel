import Link from 'next/link'
import { titleFont } from '@/modules/config/fonts'

export const Footer = () => {
  return (
    <footer className="w-full border-t border-[#e3e2e7] bg-black text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center space-x-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#c1f100] text-black">
                <span className={`${titleFont.className} text-lg font-black`}>A</span>
              </div>
              <span className={`${titleFont.className} text-xl font-extrabold tracking-tight text-white`}>
                APEX<span className="text-[#c1f100]">PADEL</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-neutral-400">
              Equipamiento técnico de pádel de alto rendimiento diseñado con precisión geométrica y los mejores
              materiales de grado profesional.
            </p>
          </div>

          {/* Nav Column 1 */}
          <div>
            <h4 className={`${titleFont.className} text-xs font-bold tracking-widest text-[#c1f100] uppercase`}>
              Catálogo
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-neutral-300">
              <li>
                <Link
                  href="/gender/men"
                  className="transition-colors hover:text-[#c1f100]"
                >
                  Colección Hombre
                </Link>
              </li>
              <li>
                <Link
                  href="/gender/women"
                  className="transition-colors hover:text-[#c1f100]"
                >
                  Colección Mujer
                </Link>
              </li>
              <li>
                <Link
                  href="/gender/kid"
                  className="transition-colors hover:text-[#c1f100]"
                >
                  Colección Junior
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div>
            <h4 className={`${titleFont.className} text-xs font-bold tracking-widest text-[#c1f100] uppercase`}>
              Información
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-neutral-300">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[#c1f100]"
                >
                  Garantía & Envíos
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[#c1f100]"
                >
                  Privacidad & Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[#c1f100]"
                >
                  Club Apex Pro
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-neutral-800 pt-6 text-[11px] text-neutral-500 sm:flex-row">
          <p>© {new Date().getFullYear()} APEX PADEL STORE. Todos los derechos reservados.</p>
          <div className="mt-3 flex space-x-4 sm:mt-0">
            <span>Envío Express 24-48h</span>
            <span>•</span>
            <span>Pago Seguro Encriptado</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
