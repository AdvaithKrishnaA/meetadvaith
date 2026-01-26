import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { ThemeSwitch } from '../footer'

export const metadata: Metadata = {
    title: {
        absolute: 'Burn | A Simple Way to Release Negative Thoughts',
    },
    description: 'Burn helps you release negative thoughts - write them down, watch them disappear, and get back to better vibes.',
    openGraph: {
        title: 'Burn | A Simple Way to Release Negative Thoughts',
        description: 'Burn helps you release negative thoughts - write them down, watch them disappear, and get back to better vibes.',
        url: 'https://meetadvaith.com/burn',
        siteName: 'Burn',
        images: [
            {
                url: 'https://meetadvaith.com/burn.webp',
                width: 1200,
                height: 630,
                alt: 'Burn',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Burn | A Simple Way to Release Negative Thoughts',
        description: 'Burn helps you release negative thoughts - write them down, watch them disappear, and get back to better vibes.',
        images: ['https://meetadvaith.com/burn.webp'],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function BurnLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <div className="fixed left-2 top-2 right-2 z-50 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-1 rounded-lg border border-white/20 bg-white/70 px-3 py-1.5 text-sm font-medium text-zinc-700 backdrop-blur-md transition-colors hover:bg-white/90 dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:bg-zinc-900/90"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Home
                </Link>
                <div className="rounded-lg border border-white/20 bg-white/70 p-1 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/70">
                    <ThemeSwitch />
                </div>
            </div>
            <div className="relative mx-auto w-full">
                {children}
            </div>
        </div>
    )
}
