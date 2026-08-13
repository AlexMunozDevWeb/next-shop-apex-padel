import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (session?.user) {
    redirect('/')
  }

  return (
    <main className="bg-surface text-on-surface flex min-h-screen w-full items-center justify-center">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8">{children}</div>
    </main>
  )
}
