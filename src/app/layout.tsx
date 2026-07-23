import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/modules/components'

export const metadata: Metadata = {
  title: {
    template: '%s - Next | shop',
    default: 'Home - Next | shop',
  },
  description: 'Una tienda virtual creada por Alex',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
