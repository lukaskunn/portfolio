import React from 'react'
import Link from 'next/link'

interface LinkHandlerProps {
  href: string;
  children: React.ReactNode;
  className: string;
}

const LinkHandler = ({
  href,
  children,
  className
}: LinkHandlerProps) => {
  const isExternal = /^https?:\/\//i.test(href)

  if (isExternal) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
  }

  return <Link href={href} className={className}>{children}</Link>
}

export default LinkHandler