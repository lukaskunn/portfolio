'use client'
import React from 'react'
import styles from '@/styles/css/components/Inner.module.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTransitionContext } from '@/contexts/TransitionContext'
import { usePathname } from 'next/navigation'

type InnerProps = {
  children?: React.ReactNode
}

const PATH_CURVED_TOP_BOTTOM = "M-2 9-2 4C0 0 10 0 12 4L12 9C10 13 0 13-2 9Z"
const PATH_CURVED_BOTTOM = "M-2 9-2 0C0 0 10 0 12 0L12 9C10 13 0 13-2 9Z"
const PATH_FLAT = "M-2 9-2 0C0 0 10 0 12 0L12 9C10 9 0 9-2 9Z"


const Inner = ({
  children
}: InnerProps) => {
  const { isTransitioningIn, isTransitioningOut, nextPath, onTransitionOutComplete, onTransitionInComplete } = useTransitionContext()
  const pathname = usePathname()
  const svgElementRef = React.useRef<SVGSVGElement>(null)
  const svgRef = React.useRef<SVGPathElement>(null)
  const transitionTextRef = React.useRef<HTMLDivElement>(null)
  const revealBlock = React.useRef<HTMLDivElement>(null)

  // Get page name from path
  const getPageName = React.useCallback((path: string) => {
    const segments = path.split('/').filter(Boolean)
    if (segments.length === 0) return 'Home'

    // Handle project routes - show project name from URL
    if (segments[0] === 'project' && segments[1]) {
      const projectName = segments[1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      return `[${projectName}]`
    }

    // Convert kebab-case to Title Case
    const pageName = segments[0]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return `[${pageName}]`
  }, [])

  useGSAP(() => {
    if (isTransitioningOut && nextPath) {
      gsap.timeline({ onComplete: onTransitionOutComplete })
        // SVG slides up from bottom while leading edge flattens
        .fromTo(svgRef.current,
          { attr: { d: PATH_CURVED_TOP_BOTTOM } },
          { attr: { d: PATH_CURVED_BOTTOM }, duration: 0.9, ease: 'cubic-bezier(0.76, 0, 0.24, 1)' },
          0
        )
        .fromTo(svgElementRef.current,
          { y: '100%' },
          { y: '0%', duration: 0.7, ease: 'cubic-bezier(0.76, 0, 0.24, 1)' },
          0.1
        )
    }
  }, [isTransitioningOut, nextPath, onTransitionOutComplete])

  useGSAP(() => {
    if (isTransitioningIn) {
      const pageName = getPageName(pathname)

      if (transitionTextRef.current) {
        transitionTextRef.current.textContent = pageName
      }

      gsap.timeline({ onComplete: onTransitionInComplete, delay: 0.5 })
        // set initial states
        .set(svgElementRef.current, { y: '0%' })
        .set(svgRef.current, { attr: { d: PATH_CURVED_BOTTOM } })
        .set(transitionTextRef.current, { opacity: 0 })
        .set(revealBlock.current, { x: '102%' })

        // reveal text with wipe
        .to(revealBlock.current, { x: '0%', duration: 0.5, ease: 'power4.in', delay: 0.2 })
        .set(transitionTextRef.current, { opacity: 1 })
        .to(revealBlock.current, { x: '-102%', duration: 0.5, ease: 'power4.out' })
        .set(revealBlock.current, { x: '102%' })

        // hold text, then wipe away
        .to(revealBlock.current, { x: '0%', duration: 0.5, ease: 'power4.in', delay: 0.4 })
        .set(transitionTextRef.current, { opacity: 0 })
        .to(revealBlock.current, { x: '-102%', duration: 0.5, ease: 'power4.out' })

        // morph leads, position follows 0.1s later — both resolve together
        .to(svgRef.current, { attr: { d: PATH_FLAT }, duration: 1.0, ease: 'cubic-bezier(0.33, 1, 0.68, 1)' })
        .to(svgElementRef.current, { y: '-100%', duration: 1.0, ease: 'cubic-bezier(0.33, 1, 0.68, 1)' }, '<0.1')

        // reset to off-screen bottom for next transition
        .set(svgElementRef.current, { y: '100%' })
        .set(svgRef.current, { attr: { d: PATH_CURVED_TOP_BOTTOM } })
    }
  }, [isTransitioningIn, pathname, getPageName, onTransitionInComplete])

  return (
    <>
      {children}
      <svg ref={svgElementRef} className={styles["animated-svg"]} viewBox="0 0 10 13" preserveAspectRatio="none">
        <path d={PATH_CURVED_TOP_BOTTOM} ref={svgRef} />
      </svg>
      <div className={styles["transition-overlay"]}>
        <div className={styles["transition-text-container"]}>
          <div ref={transitionTextRef} className={styles["transition-text"]} />
          <div className={styles["show-block"]} ref={revealBlock} />
        </div>
      </div>
    </>
  )
}

export default Inner
