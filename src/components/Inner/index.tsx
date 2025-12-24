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

const Inner = ({
  children
}: InnerProps) => {
  const { isTransitioningIn, isTransitioningOut, nextPath, displayPageName, setDisplayPageName } = useTransitionContext()
  const pathname = usePathname()
  const backgroundTransitionRef = React.useRef<HTMLDivElement>(null)
  const transitionTextRef = React.useRef<HTMLDivElement>(null)

  // Get page name from path
  const getPageName = React.useCallback((path: string) => {
    const segments = path.split('/').filter(Boolean)
    if (segments.length === 0) return 'Home'

    // Handle project routes
    if (segments[0] === 'project') return 'Project'

    // Convert kebab-case to Title Case
    const pageName = segments[0]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return `[${pageName}]`
  }, [])

  // Initialize text content on mount to current page
  React.useEffect(() => {
    if (transitionTextRef.current) {
      // Use displayPageName from context if available, otherwise calculate from pathname
      const pageName = displayPageName || getPageName(pathname)
      transitionTextRef.current.textContent = pageName
      if (!displayPageName) {
        setDisplayPageName?.(pageName)
      }
    }
  }, [pathname, displayPageName, getPageName, setDisplayPageName])

  useGSAP(() => {
    if (isTransitioningOut && nextPath) {
      // Update context with destination page name
      const destinationPageName = getPageName(nextPath)
      setDisplayPageName?.(destinationPageName)

      if (transitionTextRef.current) {
        transitionTextRef.current.textContent = destinationPageName
      }

      // Reset text to initial position
      gsap.set(transitionTextRef.current, {
        yPercent: 100,
      })

      // Slide in from right to cover the page
      gsap.fromTo(backgroundTransitionRef.current, {
        x: '100%',
      }, {
        x: '0%',
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
          // After background covers screen, reveal text from bottom to top
          gsap.to(transitionTextRef.current, {
            yPercent: 0,
            duration: 0.6,
            ease: 'power4.out',
          })
        }
      })
    }
  }, [isTransitioningOut, nextPath, getPageName, setDisplayPageName])

  useGSAP(() => {
    if (isTransitioningIn) {
      // Use the display name from context (which persists across navigation)
      if (transitionTextRef.current && displayPageName) {
        transitionTextRef.current.textContent = displayPageName
      }

      // Stay for a moment then animate text disappearing from bottom to top
      gsap.to(transitionTextRef.current, {
        delay: 0.5,
        yPercent: -105,
        duration: 0.6,
        ease: 'power4.out',
        onComplete: () => {
          // After text disappears, slide background out to the left
          gsap.to(backgroundTransitionRef.current, {
            x: '-100%',
            duration: 0.8,
            ease: 'power3.inOut',
          })
        }
      })
    }
  }, [isTransitioningIn, displayPageName])

  return (
    <>
      {children}
      <div ref={backgroundTransitionRef} className={styles["background-transition"]}>
        <div className={styles["transition-text-container"]}>
          <div ref={transitionTextRef} className={styles["transition-text"]} />
        </div>
      </div>
    </>
  )
}

export default Inner
