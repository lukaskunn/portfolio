"use client"

import Link from "next/link"
import FooterLocationBlock from "./FooterLocationBlock"
import { useContactModal } from "@/contexts/ContactModalContext"
import style from "@/styles/components/Footer.module.scss"
import EmailAndPhoneNumberBlock from "@/components/EmailAndPhoneNumberBlock"
import { useLocale } from "@/hooks/useLocale"
import { withLang } from "@/utils/locale"
import type { Settings } from "@/types/content"

export interface FooterProps {
  settings: Settings
}

const Footer = ({ settings }: FooterProps) => {
  const openContactModal = useContactModal()
  const lang = useLocale()

  const titleLines = (settings.ctaTitle ?? "").split("\n")
  const footerPages = (settings.pages ?? []).filter((page) => page.action === "link" && page.showInFooter)
  const contactPage = (settings.pages ?? []).find((page) => page.action === "contact")

  return (
    <>
      <div className={style.spacer} aria-hidden="true" />
      <footer className={style.footer}>
        <div className={style.inner}>
          <div className={style.intro}>
            <h2 className={style.title} onClick={openContactModal} data-cursor-popup={settings.ctaPopupLabel} data-reveal="rise">
              {titleLines.map((line, index) => (
                <span className={style.titleLine} key={index}><span>{line}</span></span>
              ))}
            </h2>
            <div className={style.block} data-reveal-group>
              <span className={style.muted}>{settings.sendMessageLabel}</span>
              <EmailAndPhoneNumberBlock
                info={{
                  email: settings.email,
                  phone: settings.phone,
                  copyEmailLabel: settings.copyEmailLabel,
                  emailCopiedLabel: settings.emailCopiedLabel,
                  copyPhoneLabel: settings.copyPhoneLabel,
                  phoneCopiedLabel: settings.phoneCopiedLabel,
                }}
              />
            </div>
          </div>

          <div className={style.aside}>
            <div className={style.block}>
              <FooterLocationBlock
                latitude={settings.latitude}
                longitude={settings.longitude}
                remoteFromLabel={settings.remoteFromLabel}
                timeZone={settings.timeZone ?? "America/Sao_Paulo"}
                timeOffsetAheadLabel={settings.timeOffsetAheadLabel}
                timeOffsetBehindLabel={settings.timeOffsetBehindLabel}
                timeOffsetSameLabel={settings.timeOffsetSameLabel}
              />
            </div>
            <nav className={style.sitemap} aria-label="Footer">
              <span data-reveal="up">{settings.sitemapLabel}</span>
              <div className={style.sitemapLinks} data-reveal-group>
                {footerPages.map(({ href, label }) => (
                  <Link key={href} href={href === "/#works" ? `/${lang}#works` : withLang(href ?? "/", lang)} className={style.mutedLink}>
                    {label}
                  </Link>
                ))}
                {contactPage && (
                  <button
                    type="button"
                    className={`${style.mutedLink} ${style.linkButton}`}
                    data-cursor-popup={settings.ctaPopupLabel}
                    onClick={openContactModal}
                  >
                    {contactPage.label}
                  </button>
                )}
              </div>
            </nav>
          </div>

          <div className={style.bottom}>
            <div className={style.status} data-reveal-group data-reveal-now>
              <span className={style.muted}>{settings.roleLabel}</span>
              <span>{settings.available ? settings.availableLabel : settings.unavailableLabel}</span>
            </div>
            <nav className={style.social} aria-label="Social" data-reveal-group data-reveal-now>
              {(settings.social ?? []).map(({ href, label, popupLabel }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" data-cursor-popup={popupLabel}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
