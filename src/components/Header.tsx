"use client"

import { Fragment, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaArrowRight } from "react-icons/fa"


import { useContactModal } from "@/contexts/ContactModalContext"
import style from "@/styles/components/Header.module.scss"

// Work points at the homepage section (/#works — mirrors Footer.tsx); the
// rest do not exist yet — they 404 until the pages land.
const NAV = [
  { href: "/#works", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
] as const

const Header = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const openContactModal = useContactModal()

  // startsWith so /about/* sub-routes inherit the inverted palette.
  const inverted = pathname.startsWith("/about")

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  // Closing on navigation is handled in the link handlers below, not an effect —
  // otherwise the menu stays open on top of the page you just navigated to.
  const close = () => setOpen(false)

  const className = [style.header, inverted && style.inverted, open && style.open]
    .filter(Boolean)
    .join(" ")

  return (
    <header className={className}>
      <div className={style.inner}>
        <Link href="/" className={style.logo} onClick={close}>
          Lucas Oliveira
        </Link>

        <div className={style.actions}>
          <nav className={style.nav} aria-label="Main">
            {NAV.map(({ href, label }, index) => (
              <Fragment key={href}>
                {index > 0 && (
                  <span className={style.sep} aria-hidden="true">
                    /
                  </span>
                )}
                <Link href={href} className={style.navLink}>
                  {label}
                </Link>
              </Fragment>
            ))}
          </nav>

          {/* ponytail: static placeholder — no i18n wiring yet */}
          <span className={style.lang}>
            <span className={style.langMuted}>PT</span> / EN
          </span>

          <button
            type="button"
            className={`${style.contact} ${style.contactButtonDesktop}`}
            onClick={openContactModal}
          >
            Contact
            <FaArrowRight
              size={14}
              className={style.icon}
              aria-hidden="true"
              focusable="false"
            />
          </button>
        </div>

        <button
          type="button"
          className={style.burger}
          aria-expanded={open}
          aria-controls="header-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      {/* ponytail: `inert` when closed replaces a focus trap. No scroll lock —
          this is a dropdown, not a fullscreen overlay. Add one if it ever
          grows to 100dvh. */}
      <div className={style.menuBackdrop} />
      <div id="header-menu" className={style.menu} inert={!open}>
        <button
          type="button"
          className={style.closeMenuButton}
          aria-expanded={open}
          aria-controls="header-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(false)}
        >
          Close
        </button>
        <div className={style.menuList}>

          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} className={style.navLink} onClick={close}>
              {label}
            </Link>
          ))}
          <span className={style.lang}>
            <span className={style.langMuted}>PT</span> / EN
          </span>
        </div>
        <button
          type="button"
          className={`${style.contact} ${style.contactButtonMobile}`}
          onClick={() => {
            openContactModal()
          }}
        >
          Contact
          <FaArrowRight
            size={14}
            className={style.icon}
            aria-hidden="true"
            focusable="false"
          />
        </button>
      </div>

    </header>
  )
}

export default Header
