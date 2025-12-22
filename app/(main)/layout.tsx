import { Header } from '../header'
import { Footer } from '../footer'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
      <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-12">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}
