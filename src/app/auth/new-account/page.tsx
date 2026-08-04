import Link from 'next/link'
import { titleFont } from '@/modules/config/fonts'
import { RegisterForm } from '../../../modules/user/ui/components/RegisterForm'

export default function NewAccount() {
  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="space-y-6 rounded-2xl border border-[#e3e2e7] bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="space-y-2 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-[#c1f100]">
              <span className={`${titleFont.className} text-xl font-black`}>A</span>
            </div>
            <span className={`${titleFont.className} text-xl font-extrabold tracking-tight text-black`}>
              APEX<span className="text-[#506600]">PADEL</span>
            </span>
          </Link>

          <h1 className={`${titleFont.className} pt-2 text-2xl font-extrabold text-[#1a1b1f]`}>Crear Cuenta</h1>
          <p className="text-xs text-[#4c4546]">Únete al club Apex Padel y accede a beneficios exclusivos.</p>
        </div>

        <RegisterForm />
      </div>
    </div>
  )
}
