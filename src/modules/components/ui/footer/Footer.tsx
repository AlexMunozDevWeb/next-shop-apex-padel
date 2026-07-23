import { mainFont } from '@/modules/config/fonts'
import Link from 'next/link'

export const Footer = () => {
  return (
    <div className="mb-10 flex w-full justify-center text-xs">
      <Link href="/">
        <span className={`${mainFont.className} font-bold antialiased`}>Teslo </span>
        <span>| shop </span>
        <span>© {new Date().getFullYear()}</span>
      </Link>

      <Link
        href="/"
        className="mx-3"
      >
        Privacidad & Legal
      </Link>

      <Link
        href="/"
        className="mx-3"
      >
        Ubicaciones
      </Link>
    </div>
  )
}
