'use client'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion, Transition, Variants } from 'motion/react'
import { useMemo, useId } from 'react'

export type TextMorphProps = {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  className?: string
  style?: React.CSSProperties
  variants?: Variants
  transition?: Transition
}

export function TextMorph({
  children,
  as = 'span',
  className,
  style,
  variants,
  transition,
}: TextMorphProps) {
  const uniqueId = useId()

  const Component = useMemo(() => {
    switch (as) {
      case 'h1':
        return motion.h1
      case 'h2':
        return motion.h2
      case 'h3':
        return motion.h3
      case 'h4':
        return motion.h4
      case 'h5':
        return motion.h5
      case 'h6':
        return motion.h6
      case 'p':
        return motion.p
      case 'div':
        return motion.div
      case 'span':
        return motion.span
      default:
        return motion.span
    }
  }, [as])

  const characters = useMemo(() => {
    const charCounts: Record<string, number> = {}

    return children.split('').map((char, index) => {
      const lowerChar = char.toLowerCase()
      charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1

      return {
        id: `${uniqueId}-${lowerChar}${charCounts[lowerChar]}`,
        label:
          char === ' '
            ? '\u00A0'
            : index === 0
              ? char.toUpperCase()
              : lowerChar,
      }
    })
  }, [children, uniqueId])

  const defaultVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const defaultTransition: Transition = {
    type: 'spring',
    stiffness: 280,
    damping: 18,
    mass: 0.3,
  }

  return (
    <Component className={cn(className)} aria-label={children} style={style}>
      <AnimatePresence mode="popLayout" initial={false}>
        {characters.map((character) => (
          <motion.span
            key={character.id}
            layoutId={character.id}
            className="inline-block"
            aria-hidden="true"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants || defaultVariants}
            transition={transition || defaultTransition}
          >
            {character.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </Component>
  )
}
