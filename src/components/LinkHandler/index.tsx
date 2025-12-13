import React from 'react'
import Link from 'next/link'

interface LinkHandlerProps {
  href: string;
  children: React.ReactNode;
  className: string;
  goToExternalPage?: boolean;
  onClick?: () => void;
}

const LinkHandler = ({
  href,
  children,
  className,
  goToExternalPage,
  onClick
}: LinkHandlerProps) => {
  const isExternal = /^https?:\/\//i.test(href)

  if (isExternal || goToExternalPage) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>{children}</a>
  }

  return <Link href={href} className={className} onClick={onClick}>{children}</Link>
}

export default LinkHandler