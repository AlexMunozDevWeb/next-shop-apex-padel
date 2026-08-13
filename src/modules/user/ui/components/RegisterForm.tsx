'use client'

import { login, registerUser } from '@/modules/auth/controller/authActions'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoAlertCircleOutline, IoLockClosedOutline, IoMailOutline, IoPersonOutline } from 'react-icons/io5'

type FormInputs = {
  name: string
  email: string
  password: string
}

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('')
    setIsSubmitting(true)
    const { name, email, password } = data

    const resp = await registerUser(name, email, password)
    if (!resp.ok) {
      setErrorMessage(resp.message)
      setIsSubmitting(false)
      return
    }

    await login(email.toLowerCase(), password)
    window.location.replace('/')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* Name Input */}
      <div className="flex flex-col space-y-2">
        <label className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
          Nombre Completo
        </label>
        <div className="relative">
          <IoPersonOutline className="text-on-surface-variant absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
          <input
            className={clsx(
              'border-surface-highest bg-surface-high text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed w-full rounded-xl border py-3.5 pr-4 pl-12 text-xs transition-colors focus:outline-none',
              {
                'border-red-500': !!errors.name,
              }
            )}
            type="text"
            placeholder="Ej. Carlos Alcaraz"
            autoFocus
            {...register('name', { required: true })}
          />
        </div>
      </div>

      {/* Email Input */}
      <div className="flex flex-col space-y-2">
        <label className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
          Correo Electrónico
        </label>
        <div className="relative">
          <IoMailOutline className="text-on-surface-variant absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
          <input
            className={clsx(
              'border-surface-highest bg-surface-high text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed w-full rounded-xl border py-3.5 pr-4 pl-12 text-xs transition-colors focus:outline-none',
              {
                'border-red-500': !!errors.email,
              }
            )}
            type="email"
            placeholder="tu@email.com"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="flex flex-col space-y-2">
        <label className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
          Contraseña
        </label>
        <div className="relative">
          <IoLockClosedOutline className="text-on-surface-variant absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
          <input
            className={clsx(
              'border-surface-highest bg-surface-high text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed w-full rounded-xl border py-3.5 pr-4 pl-12 text-xs transition-colors focus:outline-none',
              {
                'border-red-500': !!errors.password,
              }
            )}
            type="password"
            placeholder="Mínimo 6 caracteres"
            {...register('password', { required: true, minLength: 6 })}
          />
        </div>
      </div>

      {/* Terms & Conditions Checkbox */}
      <div className="flex items-start space-x-2 pt-1">
        <input
          type="checkbox"
          id="terms"
          required
          className="bg-surface-high border-surface-highest accent-primary-fixed mt-0.5 h-4 w-4 cursor-pointer rounded border"
        />
        <label
          htmlFor="terms"
          className="text-on-surface-variant cursor-pointer text-xs leading-tight"
        >
          Acepto los{' '}
          <a
            href="#"
            className="text-primary-fixed font-semibold hover:underline"
          >
            Términos y Condiciones
          </a>{' '}
          y la Política de Privacidad.
        </label>
      </div>

      {errorMessage && (
        <div className="fade-in flex items-center space-x-2 rounded-xl border border-red-800 bg-red-950/60 p-3 text-xs font-semibold text-red-300">
          <IoAlertCircleOutline className="h-5 w-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={clsx('w-full py-4 text-xs font-extrabold tracking-wider uppercase shadow-lg', {
          'btn-primary': !isSubmitting,
          'btn-disabled': isSubmitting,
        })}
      >
        {isSubmitting ? 'Creando cuenta...' : 'Registrarme'}
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

      <div className="pt-2 text-center">
        <p className="text-on-surface-variant text-xs">
          ¿Ya tienes cuenta?{' '}
          <Link
            href="/auth/login"
            className="text-primary-fixed ml-1 font-bold hover:underline"
          >
            Inicia Sesión
          </Link>
        </p>
      </div>
    </form>
  )
}
