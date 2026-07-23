import { mainFont } from '@/modules/config/fonts'
import { RegisterForm } from './ui/RegisterForm'

export default function NewAccount() {
  return (
    <div className="flex min-h-screen flex-col pt-32 sm:pt-52">
      <h1 className={`${mainFont.className} mb-5 text-4xl`}>Nueva cuenta</h1>

      <RegisterForm />
    </div>
  )
}
