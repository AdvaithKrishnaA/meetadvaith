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
      className="font-base flex items-center gap-1 text-center text-sm text-zinc-500 transition-colors dark:text-zinc-400"
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
      <Link
        href="/"
        className="group flex items-center gap-3 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2"
      >
        <Avatar className="size-20">
          <AvatarImage
            src="/avatar.webp"
            alt=""
            className="transition-all duration-300 group-hover:scale-105"
          />
          <AvatarFallback className="bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
            <Zap className="size-12" />
          </AvatarFallback>
        </Avatar>
        <div>
          <span className="block text-xl font-medium text-black dark:text-white">
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
          className="text-black dark:text-white transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          Writing
        </a>
      )}
    </header>
  )
}
