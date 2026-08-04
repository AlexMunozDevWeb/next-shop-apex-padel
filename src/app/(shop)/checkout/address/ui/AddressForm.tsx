'use client'

import { useEffect } from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'

import { Address } from '@/modules/address/domain'
import { Country } from '@/modules/country/domain'
import { useAddressStore } from '@/modules/store'
import { useRouter } from 'next/navigation'

import { deleteUserAddressAction, setUserAddressAction } from '@/modules/address/controller/addressActions'

interface FormInputs {
  firstName: string
  lastName: string
  address: string
  address2?: string
  postalCode: string
  city: string
  country: string
  phone: string
  rememberAddress: boolean
}

interface Props {
  countries: Country[]
  userStoredAddress?: Partial<Address>
}

export const AddressForm = ({ countries, userStoredAddress = {} }: Props) => {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      ...userStoredAddress,
      rememberAddress: false,
    },
  })

  const { data: session } = useSession({
    required: true,
  })

  const setAddress = useAddressStore((state) => state.setAddress)
  const address = useAddressStore((state) => state.address)

  useEffect(() => {
    if (address.firstName) {
      reset(address)
    }
  }, [address, reset])

  const onSubmit = async (data: FormInputs) => {
    const { rememberAddress, ...restAddress } = data
    setAddress(restAddress)

    if (rememberAddress) {
      await setUserAddressAction(restAddress, session!.user.id)
    } else {
      await deleteUserAddressAction(session!.user.id)
    }
    router.push('/checkout')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-surface-highest bg-surface-container space-y-6 rounded-2xl border p-6 shadow-xl"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col space-y-1.5">
          <label className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
            Nombres
          </label>
          <input
            type="text"
            placeholder="Ej. Juan"
            className="border-surface-highest bg-surface-high text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed rounded-xl border p-3 text-xs transition-colors focus:outline-none"
            {...register('firstName', { required: true })}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
            Apellidos
          </label>
          <input
            type="text"
            placeholder="Ej. Pérez"
            className="border-surface-highest bg-surface-high text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed rounded-xl border p-3 text-xs transition-colors focus:outline-none"
            {...register('lastName', { required: true })}
          />
        </div>

        <div className="flex flex-col space-y-1.5 sm:col-span-2">
          <label className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
            Dirección Principal
          </label>
          <input
            type="text"
            placeholder="Ej. Calle Principal 123, Piso 4B"
            className="border-surface-highest bg-surface-high text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed rounded-xl border p-3 text-xs transition-colors focus:outline-none"
            {...register('address', { required: true })}
          />
        </div>

        <div className="flex flex-col space-y-1.5 sm:col-span-2">
          <label className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
            Dirección Secundaria (Opcional)
          </label>
          <input
            type="text"
            placeholder="Ej. Edificio A, Puerta 2"
            className="border-surface-highest bg-surface-high text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed rounded-xl border p-3 text-xs transition-colors focus:outline-none"
            {...register('address2')}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
            Código Postal
          </label>
          <input
            type="text"
            placeholder="Ej. 28001"
            className="border-surface-highest bg-surface-high text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed rounded-xl border p-3 text-xs transition-colors focus:outline-none"
            {...register('postalCode', { required: true })}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">Ciudad</label>
          <input
            type="text"
            placeholder="Ej. Madrid"
            className="border-surface-highest bg-surface-high text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed rounded-xl border p-3 text-xs transition-colors focus:outline-none"
            {...register('city', { required: true })}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">País</label>
          <select
            className="border-surface-highest bg-surface-high text-on-surface focus:border-primary-fixed rounded-xl border p-3 text-xs transition-colors focus:outline-none"
            {...register('country', { required: true })}
          >
            <option value="">[ Seleccione País ]</option>
            {countries.map((country) => (
              <option
                key={country.id}
                value={country.id}
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-on-surface-variant text-[10px] font-extrabold tracking-widest uppercase">
            Teléfono de Contacto
          </label>
          <input
            type="text"
            placeholder="Ej. +34 600 000 000"
            className="border-surface-highest bg-surface-high text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-fixed rounded-xl border p-3 text-xs transition-colors focus:outline-none"
            {...register('phone', { required: true })}
          />
        </div>
      </div>

      <div className="border-surface-highest flex flex-col space-y-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <label className="text-on-surface flex cursor-pointer items-center space-x-3 text-xs font-medium">
          <input
            type="checkbox"
            className="border-surface-highest bg-surface-high text-primary-fixed accent-primary-fixed h-4 w-4 rounded"
            {...register('rememberAddress')}
          />
          <span>¿Guardar como dirección habitual en mi perfil?</span>
        </label>

        <button
          disabled={!isValid}
          type="submit"
          className={clsx('px-8 py-3.5 text-xs font-extrabold tracking-wider uppercase', {
            'btn-primary': isValid,
            'btn-disabled': !isValid,
          })}
        >
          CONTINUAR AL RESUMEN
        </button>
      </div>
    </form>
  )
}
