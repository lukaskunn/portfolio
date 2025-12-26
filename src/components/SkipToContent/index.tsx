'use client'
import React from 'react'
import styles from '@/styles/css/components/skip-to-content.module.css'

/**
 * SkipToContent - Accessibility component for keyboard navigation
 *
 * This component provides a "Skip to main content" link that appears when
 * focused via keyboard (Tab key). It allows keyboard users to bypass
 * repetitive navigation and jump directly to the main content.
 *
 * @see https://www.w3.org/WAI/WCAG21/Techniques/general/G1
 */
const SkipToContent = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const mainContent = document.getElementById('main-content')

    if (mainContent) {
      // Set tabindex to allow programmatic focus
      mainContent.setAttribute('tabindex', '-1')
      // Move focus to main content
      mainContent.focus()
      // Scroll to main content
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Remove tabindex after focus (cleanup)
      mainContent.addEventListener('blur', () => {
        mainContent.removeAttribute('tabindex')
      }, { once: true })
    }
  }

  return (
    <a
      href="#main-content"
      className={styles['skip-to-content']}
      onClick={handleClick}
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  )
}

export default React.memo(SkipToContent)
