import { auth } from '@/auth.config'
import { AddressForm } from './ui/AddressForm'
import { implementServerCountryController } from '@/modules/country/controller/ServerCountryController'
import { implementServerAddressController } from '@/modules/address/controller/AddressController'
import { titleFont } from '@/modules/config/fonts'

export default async function AddressPage() {
  const { getCountries } = implementServerCountryController()
  const countries = await getCountries({ orderBy: 'asc' })

  const session = await auth()

  if (!session?.user) {
    return (
      <div className="app-container text-on-surface py-16 text-center">
        <h3 className="text-2xl font-bold">500 - No hay sesión de usuario activa.</h3>
      </div>
    )
  }

  const { getUserAddress } = implementServerAddressController()
  const userAddress = (await getUserAddress(session.user.id)) ?? undefined

  return (
    <div className="app-container space-y-8 pb-16">
      {/* Progress Stepper */}
      <div className="border-surface-highest/50 flex items-center justify-between border-b pb-4">
        <div className="flex flex-col gap-1">
          <span className="text-primary-fixed text-[10px] font-extrabold tracking-widest uppercase">PASO 02 DE 03</span>
          <h1 className={`${titleFont.className} text-2xl font-black text-white sm:text-3xl`}>Dirección de Entrega</h1>
        </div>

        <div className="flex gap-2">
          <div className="bg-primary-fixed h-1.5 w-8 rounded-full" />
          <div className="bg-primary-fixed h-1.5 w-8 rounded-full" />
          <div className="bg-surface-highest h-1.5 w-8 rounded-full" />
        </div>
      </div>

      <AddressForm
        countries={countries}
        userStoredAddress={userAddress}
      />
    </div>
  )
}
