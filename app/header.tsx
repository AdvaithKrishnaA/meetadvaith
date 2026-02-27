'use client'
import { TextEffect } from '@/components/ui/text-effect'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { TextMorph } from '@/components/ui/text-morph'
import posthog from 'posthog-js'

function CopyButton() {
  const [text, setText] = useState('Copy')
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    if (text === 'Copied') {
      const timer = setTimeout(() => {
        setText('Copy')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [text])

  const handleCopy = () => {
    setText('Copied')
    navigator.clipboard.writeText(currentUrl)
    posthog.capture('url_copied', {
      copied_url: currentUrl,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="font-base flex items-center gap-1 text-center text-sm text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-none dark:text-zinc-400 dark:hover:text-zinc-100 dark:focus-visible:text-zinc-100"
      type="button"
      aria-label={text === 'Copied' ? 'URL copied' : 'Copy page URL'}
      aria-live="polite"
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
      <Link href="/" className="group flex items-center gap-3 focus-visible:outline-none">
        <Avatar className="size-20">
          <AvatarImage
            src="/avatar.webp"
            alt="Advaith Krishna A"
            className="transition-all duration-300 group-hover:scale-105 group-focus-visible:scale-105"
          />
          <AvatarFallback className="bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
            <Zap className="size-12" />
          </AvatarFallback>
        </Avatar>
        <div>
          <span className="font-medium text-xl text-black decoration-zinc-950/20 underline-offset-4 dark:text-white dark:decoration-white/20 group-hover:underline group-focus-visible:underline">
            Advaith Krishna A
          </span>
          <TextEffect
            as="p"
            preset="fade"
            per="char"
            className="text-zinc-600 dark:text-zinc-500"
            delay={0.5}
          >
            Product & Tech
          </TextEffect>
        </div>
      </Link>
      {isBlogPage ? (
        <CopyButton />
      ) : (
        <a
          href="#blog"
          className="text-black transition-colors hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:underline focus-visible:outline-none underline-offset-4 dark:text-white dark:hover:text-zinc-100 dark:focus-visible:text-zinc-100"
        >
          Writing
        </a>
      )}
    </header>
  )
}
