"use client"

import { Fragment, useEffect, useState, type MouseEvent } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useLenis } from "lenis/react"
import type Lenis from "lenis"


import { useContactModal } from "@/contexts/ContactModalContext"
import HeaderContactButton from "./HeaderContactButton"
import { runLangCurtain } from "@/lib/langCurtain"
import { useLocale } from "@/hooks/useLocale"
import { LOCALES, stripLang, withLang } from "@/utils/locale"
import type { Settings } from "@/types/content"
import style from "@/styles/components/Header.module.scss"

export interface HeaderProps {
  settings: Settings
}

// Works lands bottom-aligned — its last row rests on the viewport floor instead
// of its heading sitting under the header. Passing a raw position rather than
// the element sidesteps the section's scroll-margin-top, which is start-edge
// padding and would push the bottom edge below the fold.
const scrollToWorks = (lenis: Lenis) => {
  const works = document.getElementById("works")
  if (!works) return

  const rect = works.getBoundingClientRect()

  // Taller than the viewport, so both edges can't land at once — top wins.
  if (rect.height > window.innerHeight) {
    lenis.scrollTo(works)
    return
  }

  lenis.scrollTo(rect.bottom + lenis.actualScroll - window.innerHeight + 60)
}

const Header = ({ settings }: HeaderProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const lang = useLocale()
  const route = stripLang(pathname)
  const [open, setOpen] = useState(false)
  const openContactModal = useContactModal()

  const onServices = route === "/services"
  const isHome = route === "/"

  const navPages = (settings.pages ?? []).filter((page) => page.action === "link" && page.showInHeader)
  const contactPage = (settings.pages ?? []).find((page) => page.action === "contact")

  // Leaving /about or a project page is a "return" — the leaving page drops
  // away over a pinned destination. Sibling project→project keeps the cover.
  const reveal = route === "/about" || route.startsWith("/project/")
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
      if (stripLang(window.location.pathname) === "/" && lenis) scrollToWorks(lenis)
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

  // On the homepage the Work link is an in-page jump, not a route change.
  // Lenis's own anchors:true handler listens on window and ignores
  // defaultPrevented, so it needs stopPropagation to keep it from re-running
  // this as a plain top-aligned scroll.
  const onWorksAnchorClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!lenis) return
    event.preventDefault()
    event.stopPropagation()
    close()
    scrollToWorks(lenis)
  }

  const renderNav = (withSeparators: boolean) =>
    navPages.map(({ href, label }, index) => {
      const isWorks = href === "/#works"
      const localised = isWorks ? `/${lang}#works` : withLang(href ?? "/", lang)
      const link = !isWorks ? (
        <Link key={href} {...linkProps(localised)} className={style.navLink}>
          {label}
        </Link>
      ) : isHome ? (
        <a key={href} href="#works" className={style.navLink} onClick={onWorksAnchorClick}>
          {label}
        </a>
      ) : (
        <Link
          key={href}
          {...linkProps(localised)}
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

  // Same route, other locale. Crosses no root-layout boundary, so it stays a
  // client-side navigation.
  const renderLangSwitcher = () =>
    LOCALES.map((locale, index) => {
      const href = withLang(route, locale)

      // Reduced motion skips the curtain entirely — the plain <Link> falls
      // through to the 150ms fade in globals.scss.
      const onLangClick = (event: MouseEvent<HTMLAnchorElement>) => {
        close()
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        event.preventDefault()
        runLangCurtain(() => router.push(href, { scroll: false, transitionTypes: ["lang-switch"] }))
      }

      return (
        <Fragment key={locale}>
          {index > 0 && " / "}
          {locale === lang ? (
            <span aria-current="true">{locale.toUpperCase()}</span>
          ) : (
            <Link
              href={href}
              hrefLang={locale}
              className={style.langMuted}
              data-cursor-popup={settings.switchLanguageLabel?.[locale]}
              onClick={onLangClick}
            >
              {locale.toUpperCase()}
            </Link>
          )}
        </Fragment>
      )
    })

  const className = [style.header, open && style.open, isHome && style.home]
    .filter(Boolean)
    .join(" ")

  return (
    <header className={className}>
      <div className={style.inner}>
        <Link
          {...linkProps(withLang("/", lang))}
          className={style.logo}
          data-reveal="up"
          data-cursor-popup={settings.logoPopupLabel}
        >
          {settings.logoName ?? ""}
        </Link>

        <div className={style.actions}>
          <nav className={style.nav} aria-label="Main" data-reveal-group>
            {renderNav(true)}
          </nav>

          <span className={style.lang} data-reveal="up">
            {renderLangSwitcher()}
          </span>

          <HeaderContactButton
            className={`${style.contact} ${style.contactButtonDesktop}`}
            onOpen={openContactModal}
            onServices={onServices}
            label={contactPage?.label ?? ""}
            popupLabel={settings.ctaPopupLabel}
            reveal
          />
        </div>

        <button
          type="button"
          className={style.burger}
          data-reveal="up"
          aria-expanded={open}
          aria-controls="header-menu"
          aria-label={open ? settings.closeMenuLabel : settings.menuLabel}
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
          aria-label={open ? settings.closeMenuLabel : settings.menuLabel}
          onClick={() => setOpen(false)}
        >
          Close
        </button>
        <div className={style.menuList}>

          {renderNav(false)}
          <span className={style.lang}>
            {renderLangSwitcher()}
          </span>
        </div>
        <HeaderContactButton
          className={`${style.contact} ${style.contactButtonMobile}`}
          onOpen={openContactModal}
          onServices={onServices}
          label={contactPage?.label ?? ""}
          popupLabel={settings.ctaPopupLabel}
          onNavigate={close}
        />
      </div>

    </header>
  )
}

export default Header
