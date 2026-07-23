import { TopMenu, Sidebar, Footer } from '@/modules/components'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <TopMenu />
      <Sidebar />

      <div className="px-0 sm:px-10">{children}</div>

      <Footer />
    </main>
  )
}
