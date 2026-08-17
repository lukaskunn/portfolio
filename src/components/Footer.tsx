"use client"

import Link from "next/link"
import FooterLocationBlock from "./FooterLocationBlock"
import { useContactModal } from "@/contexts/ContactModalContext"
import style from "@/styles/components/Footer.module.scss"
import EmailAndPhoneNumberBlock from "@/components/EmailAndPhoneNumberBlock"
import { SITEMAP, SOCIAL } from "@/utils/contants"

const Footer = () => {
  const openContactModal = useContactModal()
  return (
    <>
      <div className={style.spacer} aria-hidden="true" />
      <footer className={style.footer}>
        <div className={style.inner}>
          <div className={style.intro}>
            <h2 className={style.title} onClick={openContactModal} data-cursor-popup="Click to open contact form" data-reveal="rise">
              <span className={style.titleLine}><span>{"Let’s craft"}</span></span>
              <span className={style.titleLine}><span>Something?</span></span>
            </h2>
            <div className={style.block} data-reveal-group>
              <span className={style.muted}>Send a message</span>
              <EmailAndPhoneNumberBlock />
            </div>
          </div>

          <div className={style.aside}>
            <div className={style.block}>
              <FooterLocationBlock />
            </div>
            <nav className={style.sitemap} aria-label="Footer">
              <span data-reveal="up">Sitemap</span>
              <div className={style.sitemapLinks} data-reveal-group>
                {SITEMAP.map(({ href, label }) => (
                  <Link key={href} href={href} className={style.mutedLink}>
                    {label}
                  </Link>
                ))}
                <button
                  type="button"
                  className={`${style.mutedLink} ${style.linkButton}`}
                  onClick={openContactModal}
                >
                  Contact me
                </button>
              </div>
            </nav>
          </div>

          <div className={style.bottom}>
            <div className={style.status} data-reveal-group data-reveal-now>
              <span className={style.muted}>Creative developer</span>
              <span>Available for freelancing</span>
            </div>
            <nav className={style.social} aria-label="Social" data-reveal-group data-reveal-now>
              {SOCIAL.map(({ href, label }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer">
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
