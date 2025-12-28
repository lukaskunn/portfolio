'use client'
import React from 'react'
import { useTransitionContext } from '@/contexts/TransitionContext'

type HTMLWrapperProps = {
  children?: React.ReactNode;
  className?: string;
}

const HTMLWrapper = ({ children, className }: HTMLWrapperProps) => {
  const { isLoaded } = useTransitionContext();

  return (
    <html lang='en' className={className} style={{ overflowY: isLoaded ? 'auto' : 'hidden' }}>{children}</html>
  )
}

export default HTMLWrapper
