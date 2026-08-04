import type { Metadata } from 'next'
import './globals.css'
import { mainFont, titleFont } from '@/modules/config/fonts'
import { Providers } from '@/modules/payments/ui/providers/Provider'

export const metadata: Metadata = {
  title: {
    template: '%s | Apex Padel',
    default: 'Apex Padel | Store',
  },
  description: 'Equípate con la tecnología de los campeones del World Padel Tour.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`dark h-full antialiased ${mainFont.variable} ${titleFont.variable}`}
    >
      <body className={`${titleFont.className} text-on-surface bg-surface flex min-h-full flex-col`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
