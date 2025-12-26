'use client'
import React from 'react'
import Link from 'next/link'
import { useTransitionContext } from '@/contexts/TransitionContext';
interface LinkHandlerProps {
  href: string;
  children: React.ReactNode;
  className: string;
  goToExternalPage?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const LinkHandler = ({
  href,
  children,
  className,
  goToExternalPage,
  onClick,
  'aria-label': ariaLabel,
  onFocus,
  onBlur
}: LinkHandlerProps) => {
  const isExternal = /^https?:\/\//i.test(href)
  const { setIsTransitioningOut, setNextPath } = useTransitionContext();

  if (isExternal || goToExternalPage) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {children}
      </a>
    )
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (onClick) onClick();
    setNextPath?.(href);
    setIsTransitioningOut(true);
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </Link>
  )
}

export default LinkHandler
