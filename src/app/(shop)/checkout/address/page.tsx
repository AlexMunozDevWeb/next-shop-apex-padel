import { auth } from '@/auth.config'

import { Title } from '@/modules/components'
import { AddressForm } from './ui/AddressForm'

import { implementServerCountryController } from '@/modules/country/controller/ServerCountryController'
import { implementServerAddressController } from '@/modules/address/controller/AddressController'

export default async function AddressPage() {
  const { getCountries } = implementServerCountryController()
  const countries = await getCountries({ orderBy: 'asc' })

  const session = await auth()

  if (!session?.user) {
    return <h3 className="text-5xl">500 - No hay sesión de usuario.</h3>
  }

  const { getUserAddress } = implementServerAddressController()
  const userAddress = (await getUserAddress(session.user.id)) ?? undefined

  return (
    <div className="mb-72 flex flex-col px-10 sm:items-center sm:justify-center sm:px-0">
      <div className="flex w-full flex-col justify-center text-left xl:w-[1000px]">
        <Title
          className=""
          title="Dirección"
          subtitle="Dirección de entrega"
        />

        <AddressForm
          countries={countries}
          userStoredAddress={userAddress}
        />
      </div>
    </div>
  )
}
