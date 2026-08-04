'use client'

import { login, registerUser } from '@/modules/auth/controller/authActions'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoAlertCircleOutline } from 'react-icons/io5'

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
      <div className="flex flex-col space-y-1.5">
        <label className="text-xs font-bold tracking-wider text-[#4c4546] uppercase">Nombre Completo</label>
        <input
          className={clsx(
            'rounded-lg border bg-white p-3 text-sm text-[#1a1b1f] transition-colors focus:border-black focus:outline-none',
            {
              'border-red-500': !!errors.name,
              'border-[#e3e2e7]': !errors.name,
            }
          )}
          type="text"
          placeholder="Ej. Carlos Alcaraz"
          autoFocus
          {...register('name', { required: true })}
        />
      </div>

      <div className="flex flex-col space-y-1.5">
        <label className="text-xs font-bold tracking-wider text-[#4c4546] uppercase">Correo Electrónico</label>
        <input
          className={clsx(
            'rounded-lg border bg-white p-3 text-sm text-[#1a1b1f] transition-colors focus:border-black focus:outline-none',
            {
              'border-red-500': !!errors.email,
              'border-[#e3e2e7]': !errors.email,
            }
          )}
          type="email"
          placeholder="tu@email.com"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
      </div>

      <div className="flex flex-col space-y-1.5">
        <label className="text-xs font-bold tracking-wider text-[#4c4546] uppercase">Contraseña</label>
        <input
          className={clsx(
            'rounded-lg border bg-white p-3 text-sm text-[#1a1b1f] transition-colors focus:border-black focus:outline-none',
            {
              'border-red-500': !!errors.password,
              'border-[#e3e2e7]': !errors.password,
            }
          )}
          type="password"
          placeholder="Mínimo 6 caracteres"
          {...register('password', { required: true, minLength: 6 })}
        />
      </div>

      {errorMessage && (
        <div className="fade-in flex items-center space-x-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
          <IoAlertCircleOutline className="h-5 w-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={clsx('w-full py-3 text-xs font-extrabold tracking-wider uppercase', {
          'btn-primary': !isSubmitting,
          'btn-disabled': isSubmitting,
        })}
      >
        {isSubmitting ? 'Creando cuenta...' : 'Registrarme'}
      </button>

      <div className="my-6 flex items-center space-x-3">
        <div className="h-px flex-1 bg-[#e3e2e7]" />
        <span className="text-[11px] font-bold tracking-widest text-[#4c4546] uppercase">o</span>
        <div className="h-px flex-1 bg-[#e3e2e7]" />
      </div>

      <Link
        href="/auth/login"
        className="btn-outline w-full text-center text-xs font-bold tracking-wider uppercase"
      >
        Ya tengo cuenta - Iniciar Sesión
      </Link>
    </form>
  )
}
