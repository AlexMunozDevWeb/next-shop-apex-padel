import Link from 'next/link'
import { titleFont } from '@/modules/config/fonts'
import { LoginForm } from '../../../modules/auth/ui/components/LoginForm'
import { IoFlashOutline, IoShieldCheckmarkOutline, IoTrophyOutline } from 'react-icons/io5'

export default function LoginPage() {
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
            <IoFlashOutline className="h-4 w-4" />
            <span>EXCELENCIA EN CADA PUNTO</span>
          </div>

          <h1
            className={`${titleFont.className} text-4xl leading-tight font-black tracking-tight text-white xl:text-5xl`}
          >
            EQUIPAMIENTO DE ALTO RENDIMIENTO & LIFESTYLE.
          </h1>

          <p className="text-on-surface-variant text-sm leading-relaxed">
            Ingresa a tu cuenta para gestionar tus pedidos, acceder a lanzamientos de edición limitada Pro Stock y
            disfrutar de beneficios exclusivos para miembros.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="border-surface-highest bg-surface-low space-y-1 rounded-xl border p-4">
              <div className="text-primary-fixed flex items-center space-x-2 text-xs font-bold">
                <IoTrophyOutline className="h-4 w-4" />
                <span>Nivel Pro Stock</span>
              </div>
              <p className="text-on-surface-variant text-[11px]">Palas y material probado en circuito profesional.</p>
            </div>

            <div className="border-surface-highest bg-surface-low space-y-1 rounded-xl border p-4">
              <div className="text-primary-fixed flex items-center space-x-2 text-xs font-bold">
                <IoShieldCheckmarkOutline className="h-4 w-4" />
                <span>Garantía Oficial</span>
              </div>
              <p className="text-on-surface-variant text-[11px]">Soporte prioritario y envíos express seguros.</p>
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
              Iniciar Sesión
            </h2>
            <p className="text-on-surface-variant text-xs">
              Introduce tus datos de acceso para ingresar a tu panel personal.
            </p>
          </div>

          {/* Form Card */}
          <div className="border-surface-highest bg-surface-low rounded-2xl border p-6 shadow-2xl sm:p-8">
            <LoginForm />
          </div>

          {/* Footer Navigation */}
          <div className="text-center">
            <p className="text-on-surface-variant text-xs">
              ¿Aún no eres miembro?{' '}
              <Link
                href="/auth/new-account"
                className="text-primary-fixed ml-1 font-bold hover:underline"
              >
                Crea una cuenta gratis
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
