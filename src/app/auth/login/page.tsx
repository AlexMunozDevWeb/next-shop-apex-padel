import { mainFont } from '@/modules/config/fonts'
import { LoginForm } from './ui/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col pt-32 sm:pt-52">
      <h1 className={`${mainFont.className} mb-5 text-4xl`}>Ingresar</h1>

      <LoginForm />
    </div>
  )
}
