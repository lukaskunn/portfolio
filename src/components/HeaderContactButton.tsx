"use client"

import { FaArrowRight } from "react-icons/fa"

// Header.module.scss is deliberately not split — its rules are scoped under
// .header / .home, so the classes must keep compiling against that file.
import style from "@/styles/components/Header.module.scss"

export interface HeaderContactButtonProps {
  className: string
  onOpen: () => void
  onServices: boolean
  reveal?: boolean
  onNavigate?: () => void
}

const HeaderContactButton = ({
  className,
  onOpen,
  onServices,
  reveal,
  onNavigate,
}: HeaderContactButtonProps) => {
  const label = (
    <>
      Contact
      <FaArrowRight size={14} className={style.icon} aria-hidden="true" focusable="false" />
    </>
  )

  if (onServices) {
    return (
      <a href="#contact" className={className} data-reveal={reveal ? "up" : undefined} onClick={onNavigate}>
        {label}
      </a>
    )
  }

  return (
    <button type="button" className={className} data-reveal={reveal ? "up" : undefined} onClick={onOpen}>
      {label}
    </button>
  )
}

export default HeaderContactButton
