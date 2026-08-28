"use client"
export interface HeaderContactButtonProps {
  className: string
  onOpen: () => void
  onServices: boolean
  label: string
  popupLabel?: string
  reveal?: boolean
  onNavigate?: () => void
}

const HeaderContactButton = ({
  className,
  onOpen,
  onServices,
  label,
  popupLabel,
  reveal,
  onNavigate,
}: HeaderContactButtonProps) => {
  if (onServices) {
    return (
      <a href="#contact" className={className} data-reveal={reveal ? "up" : undefined} onClick={onNavigate}>
        {label}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={className}
      data-reveal={reveal ? "up" : undefined}
      data-cursor-popup={popupLabel}
      onClick={onOpen}
    >
      {label}
    </button>
  )
}

export default HeaderContactButton
