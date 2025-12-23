'use client'
import React from 'react'
import { usePageContext } from '@/contexts/PageContext'

type HTMLWrapperProps = {
  children?: React.ReactNode;
  className?: string;
}

const HTMLWrapper = ({ children, className }: HTMLWrapperProps) => {
  const { isLoaded } = usePageContext();

  return (
    <html lang='en' className={className} style={{ overflowY: isLoaded ? 'auto' : 'hidden' }}>{children}</html>
  )
}

export default HTMLWrapper