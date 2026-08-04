import Link from 'next/link'
import { titleFont } from '@/modules/config/fonts'
import { LoginForm } from './ui/LoginForm'

export default function LoginPage() {
  return (
    <div className="bg-surface text-on-surface relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
      {/* Glow effect */}
      <div className="bg-primary-fixed/10 pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Logo & Branding */}
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="group mb-4 flex flex-col items-center"
          >
            <div className="bg-primary-fixed text-on-primary-fixed relative flex h-20 w-20 items-center justify-center rounded-2xl shadow-2xl transition-transform group-hover:scale-105">
              <span className={`${titleFont.className} text-4xl font-black tracking-tighter`}>A</span>
            </div>
            <h1 className={`${titleFont.className} mt-4 text-3xl font-black tracking-tight text-white`}>APEX PADEL</h1>
            <p className="text-on-surface-variant mt-1 text-[11px] font-extrabold tracking-widest uppercase">
              High Performance Club
            </p>
          </Link>
        </div>

        {/* Login Form Card */}
        <div className="border-surface-highest bg-surface-low rounded-2xl border p-8 shadow-2xl">
          <LoginForm />
        </div>

        {/* Footer Link */}
        <div className="text-center">
          <p className="text-on-surface-variant text-xs">
            ¿Aún no eres miembro?{' '}
            <Link
              href="/auth/new-account"
              className="text-primary-fixed ml-1 font-bold hover:underline"
            >
              Crea una cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
