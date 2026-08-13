import Link from 'next/link'
import { titleFont } from '@/modules/config/fonts'
import { RegisterForm } from '../../../modules/user/ui/components/RegisterForm'
import { IoFlashOutline, IoFlameOutline, IoRibbonOutline } from 'react-icons/io5'

export default function NewAccount() {
  return (
    <div className="text-on-surface relative min-h-[85vh] w-full py-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:py-12">
      {/* LEFT COLUMN: Brand Panel (Visible on lg screens) */}
      <div className="border-surface-highest bg-surface-lowest relative hidden flex-col justify-between overflow-hidden border-r p-12 lg:flex">
        {/* Glow ambient background effects */}
        <div className="bg-primary-fixed/10 pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-primary-fixed/5 pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full blur-3xl" />

        {/* Top Header Logo */}
        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center space-x-3"
          >
            <div className="bg-primary-fixed text-on-primary-fixed flex h-12 w-12 items-center justify-center rounded-xl shadow-lg">
              <span className={`${titleFont.className} text-2xl font-black`}>A</span>
            </div>
            <div>
              <span className={`${titleFont.className} text-2xl font-black tracking-tight text-white`}>
                APEX<span className="text-primary-fixed">PADEL</span>
              </span>
              <p className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
                High Performance Club
              </p>
            </div>
          </Link>
        </div>

        {/* Hero Branding Body */}
        <div className="relative z-10 my-auto max-w-lg space-y-6">
          <div className="border-surface-highest bg-surface-low text-primary-fixed inline-flex items-center space-x-2 rounded-full border px-4 py-1.5 text-xs font-bold">
            <IoFlameOutline className="h-4 w-4" />
            <span>ÚNETE A LA ÉLITE DEL PÁDEL</span>
          </div>

          <h1
            className={`${titleFont.className} text-4xl leading-tight font-black tracking-tight text-white xl:text-5xl`}
          >
            FORJA TU LEYENDA EN LA PISTA.
          </h1>

          <p className="text-on-surface-variant text-sm leading-relaxed">
            Crea tu cuenta oficial en Apex Padel para acceder a ventas privadas, seguimiento personalizado de pedidos y
            colecciones exclusivas reservadas para miembros del club.
          </p>

          <div className="space-y-3 pt-2">
            <div className="border-surface-highest bg-surface-low flex items-center space-x-3 rounded-xl border p-3.5">
              <div className="bg-primary-fixed/10 text-primary-fixed flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                <IoRibbonOutline className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Acceso Prioritario a Novedades</h4>
                <p className="text-on-surface-variant text-[11px]">
                  Sé el primero en reservar las palas de edición pro limitadas.
                </p>
              </div>
            </div>

            <div className="border-surface-highest bg-surface-low flex items-center space-x-3 rounded-xl border p-3.5">
              <div className="bg-primary-fixed/10 text-primary-fixed flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                <IoFlashOutline className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Proceso de Compra Ultrarrápido</h4>
                <p className="text-on-surface-variant text-[11px]">
                  Guarda tus direcciones y métodos de pago de forma 100% segura.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-on-surface-variant/60 relative z-10 text-xs">
          © {new Date().getFullYear()} APEX PADEL CLUB. All rights reserved.
        </div>
      </div>

      {/* RIGHT COLUMN: Form Container */}
      <div className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          {/* Logo visible on Mobile / Tablet */}
          <div className="text-center lg:hidden">
            <Link
              href="/"
              className="inline-flex flex-col items-center"
            >
              <div className="bg-primary-fixed text-on-primary-fixed flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl">
                <span className={`${titleFont.className} text-3xl font-black`}>A</span>
              </div>
              <h1 className={`${titleFont.className} mt-3 text-2xl font-black tracking-tight text-white`}>
                APEX PADEL
              </h1>
              <p className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
                High Performance Club
              </p>
            </Link>
          </div>

          {/* Form Header */}
          <div className="space-y-2 text-center lg:text-left">
            <h2 className={`${titleFont.className} text-2xl font-black tracking-tight text-white lg:text-3xl`}>
              Crear Cuenta
            </h2>
            <p className="text-on-surface-variant text-xs">Completa tus datos para unirte al club Apex Padel.</p>
          </div>

          {/* Form Card */}
          <div className="border-surface-highest bg-surface-low rounded-2xl border p-6 shadow-2xl sm:p-8">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}
