"use client"

import { Fragment, useEffect, useState, type MouseEvent } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaArrowRight } from "react-icons/fa"
import { useLenis } from "lenis/react"


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

  const onServices = pathname === "/services"
  const isHome = pathname === "/"

  // Leaving /about or a project page is a "return" — the leaving page drops
  // away over a pinned destination. Sibling project→project keeps the cover.
  const reveal = pathname === "/about" || pathname.startsWith("/project/")
  const transitionTypes = reveal ? ["nav-reveal"] : undefined
  const lenis = useLenis()

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

  // Cross-route Work: Next's hash scroll (scroll={false}) would jump instantly
  // under the transition snapshot, so it is suppressed and Lenis takes over
  // once the snapshot is gone — see the durations in globals.scss.
  const onWorksClick = () => {
    close()
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const delay = reduced ? 200 : reveal ? 620 : 1120

    window.setTimeout(() => {
      // ponytail: no timer ref — Header never unmounts, and this bails if the
      // user navigated somewhere else in the meantime.
      if (window.location.pathname === "/") lenis?.scrollTo("#works")
    }, delay)
  }

  const linkProps = (href: string) => {
    const current = href === pathname

    return {
      href,
      transitionTypes,
      "aria-current": current ? ("page" as const) : undefined,
      onClick: (event: MouseEvent<HTMLAnchorElement>) => {
        if (current) event.preventDefault()
        close()
      },
    }
  }

  // On the homepage the Work link is an in-page jump, not a route change —
  // Lenis (anchors: true) smooth-scrolls a plain hash anchor for free.
  const renderNav = (withSeparators: boolean) =>
    NAV.map(({ href, label }, index) => {
      const isWorks = href === "/#works"
      const link = !isWorks ? (
        <Link key={href} {...linkProps(href)} className={style.navLink}>
          {label}
        </Link>
      ) : isHome ? (
        <a key={href} href="#works" className={style.navLink} onClick={close}>
          {label}
        </a>
      ) : (
        <Link
          key={href}
          {...linkProps(href)}
          scroll={false}
          onClick={onWorksClick}
          className={style.navLink}
        >
          {label}
        </Link>
      )

      if (!withSeparators) return link

      return (
        <Fragment key={href}>
          {index > 0 && (
            <span className={style.sep} aria-hidden="true">
              /
            </span>
          )}
          {link}
        </Fragment>
      )
    })

  const className = [style.header, open && style.open, isHome && style.home]
    .filter(Boolean)
    .join(" ")

  const contactLabel = (
    <>
      Contact
      <FaArrowRight size={14} className={style.icon} aria-hidden="true" focusable="false" />
    </>
  )

  return (
    <header className={className}>
      <div className={style.inner}>
        <Link {...linkProps("/")} className={style.logo} data-reveal="up">
          Lucas Oliveira
        </Link>

        <div className={style.actions}>
          <nav className={style.nav} aria-label="Main" data-reveal-group>
            {renderNav(true)}
          </nav>

          {/* ponytail: static placeholder — no i18n wiring yet */}
          <span className={style.lang} data-reveal="up">
            <span className={style.langMuted}>PT</span> / EN
          </span>

          {onServices ? (
            <a href="#contact" className={`${style.contact} ${style.contactButtonDesktop}`}
              data-reveal="up">
              {contactLabel}
            </a>
          ) : (
            <button
              type="button"
              className={`${style.contact} ${style.contactButtonDesktop}`}
              data-reveal="up"
              onClick={openContactModal}
            >
              {contactLabel}
            </button>
          )}
        </div>

        <button
          type="button"
          className={style.burger}
          data-reveal="up"
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

          {renderNav(false)}
          <span className={style.lang}>
            <span className={style.langMuted}>PT</span> / EN
          </span>
        </div>
        {onServices ? (
          <a
            href="#contact"
            className={`${style.contact} ${style.contactButtonMobile}`}
            onClick={close}
          >
            {contactLabel}
          </a>
        ) : (
          <button
            type="button"
            className={`${style.contact} ${style.contactButtonMobile}`}
            onClick={() => {
              openContactModal()
            }}
          >
            {contactLabel}
          </button>
        )}
      </div>

    </header>
  )
}

export default Header
