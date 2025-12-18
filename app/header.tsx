'use client'
import { TextEffect } from '@/components/ui/text-effect'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { TextMorph } from '@/components/ui/text-morph'

function CopyButton() {
  const [text, setText] = useState('Copy')
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    setTimeout(() => {
      setText('Copy')
    }, 2000)
  }, [text])

  return (
    <button
      onClick={() => {
        setText('Copied')
        navigator.clipboard.writeText(currentUrl)
      }}
      className="font-base flex items-center gap-1 text-center text-sm text-zinc-500 transition-colors dark:text-zinc-400"
      type="button"
    >
      <TextMorph>{text}</TextMorph>
      <span>URL</span>
    </button>
  )
}

export function Header() {
  const pathname = usePathname()
  const isBlogPage = pathname?.startsWith('/blog')

  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="size-20">
          <AvatarImage src="/avatar.png" alt="Advaith Krishna A" />
          <AvatarFallback className="bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
            <Zap className="size-12" />
          </AvatarFallback>
        </Avatar>
        <div>
          <Link href="/" className="font-medium text-xl text-black dark:text-white">
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
      {isBlogPage ? (
        <CopyButton />
      ) : (
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
