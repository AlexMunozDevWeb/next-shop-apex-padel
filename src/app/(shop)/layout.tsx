import { TopMenu, Sidebar, Footer } from '@/modules/shared/ui/components'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface text-on-surface flex min-h-screen flex-col">
      <TopMenu />
      <Sidebar />

      <main className="w-full flex-1 pt-16 pb-24">{children}</main>

      <Footer />
    </div>
  )
}
