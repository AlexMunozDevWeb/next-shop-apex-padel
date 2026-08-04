'use client'

import { authenticate } from '@/modules/auth/controller/authActions'
import clsx from 'clsx'
import { useActionState, useEffect } from 'react'
import { IoAlertCircleOutline, IoLockClosedOutline, IoMailOutline } from 'react-icons/io5'

export const LoginForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

  useEffect(() => {
    if (errorMessage === 'Success') {
      window.location.replace('/')
    }
  }, [errorMessage])

  return (
    <form
      action={formAction}
      className="space-y-5"
    >
      {/* Email Input */}
      <div className="flex flex-col space-y-2">
        <label
          className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase"
          htmlFor="email"
        >
          Email
        </label>
        <div className="relative">
          <IoMailOutline className="text-on-surface-variant absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
          <input
            id="email"
            className="border-surface-highest bg-surface-high text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed w-full rounded-xl border py-3.5 pr-4 pl-12 text-xs transition-colors focus:outline-none"
            type="email"
            name="email"
            placeholder="tu@email.com"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="flex flex-col space-y-2">
        <label
          className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase"
          htmlFor="password"
        >
          Contraseña
        </label>
        <div className="relative">
          <IoLockClosedOutline className="text-on-surface-variant absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
          <input
            id="password"
            className="border-surface-highest bg-surface-high text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed w-full rounded-xl border py-3.5 pr-4 pl-12 text-xs transition-colors focus:outline-none"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      {/* Forgot Password */}
      <div className="flex justify-end pt-0.5">
        <a
          href="#"
          className="text-primary-fixed text-xs font-bold transition-opacity hover:opacity-80"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {errorMessage && errorMessage !== 'Success' && (
        <div className="fade-in flex items-center space-x-2 rounded-xl border border-red-800 bg-red-950/60 p-3 text-xs font-semibold text-red-300">
          <IoAlertCircleOutline className="h-5 w-5 flex-shrink-0" />
          <span>Credenciales incorrectas. Comprueba tu email y contraseña.</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={clsx('w-full py-4 text-xs font-extrabold tracking-wider uppercase shadow-lg', {
          'btn-primary': !isPending,
          'btn-disabled': isPending,
        })}
        disabled={isPending}
      >
        {isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>

      {/* Divider */}
      <div className="my-6 flex items-center space-x-3">
        <div className="bg-surface-highest h-px flex-1" />
        <span className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
          O continúa con
        </span>
        <div className="bg-surface-highest h-px flex-1" />
      </div>

      {/* Social Logins */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="bg-surface-high hover:bg-surface-highest flex items-center justify-center space-x-2 rounded-xl py-3 text-xs font-bold text-white transition-colors"
        >
          <span>Google</span>
        </button>
        <button
          type="button"
          className="bg-surface-high hover:bg-surface-highest flex items-center justify-center space-x-2 rounded-xl py-3 text-xs font-bold text-white transition-colors"
        >
          <span>Apple</span>
        </button>
      </div>
    </form>
  )
}
