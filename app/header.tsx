'use client'
import { TextEffect } from '@/components/ui/text-effect'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const isBlogPage = pathname?.startsWith('/blog')

  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="size-12">
          <AvatarImage src="/avatar.jpg" alt="Advaith Krishna A" />
          <AvatarFallback className="bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
            <Zap className="size-6" />
          </AvatarFallback>
        </Avatar>
        <div>
          <Link href="/" className="font-medium text-black dark:text-white">
            Advaith Krishna A
          </Link>
          <TextEffect
            as="p"
            preset="fade"
            per="char"
            className="text-zinc-600 dark:text-zinc-500"
            delay={0.5}
          >
            Tech + Product
          </TextEffect>
        </div>
      </div>
      {!isBlogPage && (
        <a
          href="#blog"
          className="text-black dark:text-white transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          Blog
        </a>
      )}
    </header>
  )
}
