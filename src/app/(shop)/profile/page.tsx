import { auth } from '@/auth.config'
import { Title } from '@/modules/shared/ui/components'
import { redirect } from 'next/navigation'
import { titleFont } from '@/modules/config/fonts'
import { IoMailOutline, IoPersonOutline, IoShieldCheckmarkOutline, IoSparklesOutline } from 'react-icons/io5'
import Link from 'next/link'

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login')
  }

  const { name, email, role, image } = session.user

  return (
    <div className="space-y-8 pb-16">
      <Title
        title="Mi Perfil"
        subtitle="Administra la información de tu cuenta Apex Padel y tus datos personales."
        className="my-0"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* User Card */}
        <div className="lg:col-span-4">
          <div className="flex flex-col items-center rounded-2xl border border-[#e3e2e7] bg-white p-8 text-center shadow-sm">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-black text-[#c1f100] shadow-md">
              <span className={`${titleFont.className} text-3xl font-black`}>
                {name?.charAt(0).toUpperCase() || 'U'}
              </span>
              <div className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#c1f100] text-black">
                <IoSparklesOutline className="h-4 w-4" />
              </div>
            </div>

            <h2 className={`${titleFont.className} mt-4 text-xl font-extrabold text-[#1a1b1f]`}>{name}</h2>
            <p className="text-xs font-semibold text-[#4c4546]">{email}</p>

            <div className="mt-4 inline-flex items-center space-x-1.5 rounded-full bg-[#f4f3f8] px-3.5 py-1 text-xs font-extrabold tracking-wider text-black uppercase">
              <IoShieldCheckmarkOutline className="h-4 w-4 text-[#506600]" />
              <span>Rol: {role}</span>
            </div>
          </div>
        </div>

        {/* Details & Quick Links */}
        <div className="space-y-6 lg:col-span-8">
          <div className="space-y-4 rounded-2xl border border-[#e3e2e7] bg-white p-6 shadow-sm">
            <h3
              className={`${titleFont.className} border-b border-[#f4f3f8] pb-3 text-base font-extrabold text-[#1a1b1f]`}
            >
              Datos de Cuenta
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-3 rounded-xl bg-[#f4f3f8] p-3.5">
                <IoPersonOutline className="h-5 w-5 text-black" />
                <div>
                  <span className="block text-[10px] font-extrabold tracking-wider text-[#4c4546] uppercase">
                    Nombre Completo
                  </span>
                  <span className="text-xs font-bold text-[#1a1b1f]">{name}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-xl bg-[#f4f3f8] p-3.5">
                <IoMailOutline className="h-5 w-5 text-black" />
                <div>
                  <span className="block text-[10px] font-extrabold tracking-wider text-[#4c4546] uppercase">
                    Correo Electrónico
                  </span>
                  <span className="text-xs font-bold text-[#1a1b1f]">{email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-[#e3e2e7] bg-white p-6 shadow-sm">
            <h3
              className={`${titleFont.className} border-b border-[#f4f3f8] pb-3 text-base font-extrabold text-[#1a1b1f]`}
            >
              Accesos Rápidos
            </h3>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/orders"
                className="btn-secondary text-xs"
              >
                Ver Mis Pedidos
              </Link>
              <Link
                href="/checkout/address"
                className="btn-outline text-xs"
              >
                Gestionar Dirección
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
