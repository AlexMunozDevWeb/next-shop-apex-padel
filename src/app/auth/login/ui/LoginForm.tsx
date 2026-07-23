'use client'
import { authenticate } from '@/modules/auth/controller/authActions'
import { sleep } from '@/modules/shared/utils'
import clsx from 'clsx'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { IoInformationOutline } from 'react-icons/io5'

export const LoginForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)
  // const router = useRouter()

  console.log(`ErrorMessage: ${errorMessage}`)

  useEffect(() => {
    if (errorMessage === 'Success') {
      // router.replace('/')
      console.log(`ErrorMSN: ${errorMessage}`)

      window.location.replace('/')
    }
  }, [errorMessage])

  return (
    <>
      <form
        action={formAction}
        className="flex flex-col"
      >
        <label htmlFor="email">Correo electrónico</label>
        <input
          className="mb-5 rounded border bg-gray-200 px-5 py-2"
          type="email"
          name="email"
        />

        <label htmlFor="email">Contraseña</label>
        <input
          className="mb-5 rounded border bg-gray-200 px-5 py-2"
          type="password"
          name="password"
        />

        {errorMessage && (
          <>
            <div className="mb-2 flex flex-row">
              <IoInformationOutline className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">Credenciales incorrectas</p>
            </div>
          </>
        )}

        <button
          type="submit"
          className={clsx({
            'btn-primary': !isPending,
            'btn-disable': isPending,
          })}
          disabled={isPending}
        >
          Ingresar
        </button>

        {/* divisor l ine */}
        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/new-account"
          className="btn-secondary text-center"
        >
          Crear una nueva cuenta
        </Link>
      </form>
    </>
  )
}
