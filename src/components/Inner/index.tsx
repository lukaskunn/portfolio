'use client'
import React from 'react'
import styles from '@/styles/css/components/Inner.module.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTransitionContext } from '@/contexts/TransitionContext'

type InnerProps = {
  children?: React.ReactNode
}

const Inner = ({
  children
}: InnerProps) => {
  const { isTransitioningIn, isTransitioningOut } = useTransitionContext()
  const backgroundTransitionRef = React.useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (isTransitioningOut) {
      // Slide in from right to cover the page
      gsap.fromTo(backgroundTransitionRef.current, {
        x: '100%',
      }, {
        x: '0%',
        duration: 0.6,
        ease: 'power3.inOut',
      })
    }
  }, [isTransitioningOut])

  useGSAP(() => {
    if (isTransitioningIn) {
      // Stay for 1 second then slide out to the left
      gsap.to(backgroundTransitionRef.current, {
        x: '0%',
        duration: 1,
        ease: 'none',
        onComplete: () => {
          gsap.to(backgroundTransitionRef.current, {
            x: '-100%',
            duration: 0.8,
            ease: 'power3.inOut',
          })
        }
      })
    }
  }, [isTransitioningIn])

  return (
    <>
      {children}
      <div ref={backgroundTransitionRef} className={styles["background-transition"]} />
    </>
  )
}

export default Inner
