import Link from "next/link"
import FooterLocationBlock from "./FooterLocationBlock"
import style from "@/styles/components/Footer.module.scss"

// WORKS points at the homepage section — /work will never be a real route.
const SITEMAP = [
  { href: "/#works", label: "Works" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
] as const

// ponytail: placeholder URLs — swap for the real profiles.
export const SOCIAL = [
  { href: "https://x.com", label: "Twitter / X", popupLabel: "@http.lucaso" },
  { href: "https://linkedin.com", label: "LinkedIn", popupLabel: "Lucas Oliveira" },
  { href: "https://github.com", label: "GitHub", popupLabel: "@lukaskunn" },
] as const

export const EMAIL = "hello@lucasoliveira.io"

const Footer = () => {
  return (
    <>
      <div className={style.spacer} aria-hidden="true" />
      <footer className={style.footer}>
        <div className={style.inner}>
          <div className={style.intro}>
            <h2 className={style.title}>
              {"Let’s craft"}
              <br />
              Something?
            </h2>
            <div className={style.block}>
              <span className={style.muted}>Send a message</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <span>+55 11 9 5442-5212</span>
            </div>
          </div>

          <div className={style.aside}>
            <div className={style.block}>
              <FooterLocationBlock />
            </div>
            <nav className={style.sitemap} aria-label="Footer">
              <span>Sitemap</span>
              <div className={style.sitemapLinks}>
                {SITEMAP.map(({ href, label }) => (
                  <Link key={href} href={href} className={style.mutedLink}>
                    {label}
                  </Link>
                ))}
                {/* ponytail: no handler yet — same contact popup TODO as the header button. */}
                <button type="button" className={`${style.mutedLink} ${style.linkButton}`}>
                  Contact me
                </button>
              </div>
            </nav>
          </div>

          <div className={style.bottom}>
            <div className={style.status}>
              <span className={style.muted}>Creative developer</span>
              <span>Available for freelancing</span>
            </div>
            <nav className={style.social} aria-label="Social">
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
