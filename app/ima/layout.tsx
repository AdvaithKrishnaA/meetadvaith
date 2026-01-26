import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Footer } from '../footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Ima | Manage Tasks that Matter',
  },
  description:
    'Tasks that fade away when their time ends. A minimal macOS app for attention, not backlog.',

  openGraph: {
    title: 'Ima | Manage Tasks that Matter',
    description:
      'Tasks that fade away when their time ends. A minimal macOS app for attention, not backlog.',
    url: 'https://meetadvaith.com/ima',
    siteName: 'Ima',
    images: [
      {
        url: 'https://meetadvaith.com/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Ima — Manage Tasks that Matter',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Ima | Manage Tasks that Matter',
    description:
      'A quiet macOS task app where tasks exist briefly and fade away when time ends.',
    images: ['https://meetadvaith.com/og-image.webp'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ImaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
      <Link
        href="/"
        className="fixed left-2 top-2 z-50 flex items-center gap-1 rounded-lg border border-white/20 bg-white/70 px-3 py-1.5 text-sm font-medium text-zinc-700 backdrop-blur-md transition-colors hover:bg-white/90 dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:bg-zinc-900/90"
      >
        <ChevronLeft className="h-4 w-4" />
        Home
      </Link>
      <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 py-8">
        {children}
        <Footer />
      </div>
    </div>
  )
}
