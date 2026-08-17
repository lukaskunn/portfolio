import Image from "next/image"
import EmailAndPhoneNumberBlock from "@/components/EmailAndPhoneNumberBlock"
import style from "@/styles/about/about.module.scss"
import { SOCIAL, CLIENTS } from "@/utils/contants"
import { buildMetadata } from "@/utils/metadata"

export const metadata = buildMetadata({
  title: "About",
  description:
    "Creative web developer and software engineer from São Paulo, building design-led websites and products for brands like Dexco, Motorola and KitchenAid.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <main id="main-content" className={`${style.page} aboutPage`}>
      <div className={style.headerSpacer} aria-hidden="true" />

      <div className={style.hero}>
        <h1 className={style.title} data-reveal="lines" data-reveal-now>
          creative web developer &<br />
          software engineer
        </h1>
        <div className={style.profileImage} data-reveal="curtain" data-reveal-now>
          <Image
            src="/assets/images/about/profile_image.jpg"
            alt="Portrait of Lucas Oliveira"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 767.98px) calc(100vw - 40px), 252px"
            priority
          />
        </div>
      </div>

      <div className={style.bioRow}>
        <div className={style.bio}>
          <p data-reveal="lines" data-reveal-now>
            Hi, I'm Lucas. A <span className={style.highlight}>creative developer</span> and software engineer focusing on web design, motion and to create awesome experiences
          </p>
          <p data-reveal="lines" data-reveal-now>
            As a <span className={style.highlight}>creative developer</span>, I help individuals and companies to create awesome digital experiences and grow their business through design and engineering
          </p>
        </div>
        <div className={style.clients}>
          <span className={style.clientsLabel} data-reveal="up" data-reveal-now>clients i worked on</span>
          <div className={style.clientsList} data-reveal="rise" data-reveal-now>
            {CLIENTS.map((client) => (
              <span key={client} className={style.clientName}>
                <span>{client}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={style.contact}>
        <div className={style.getInTouch} data-reveal-group data-reveal-now>
          <span className={style.getInTouchLabel}>Get in touch</span>
          <EmailAndPhoneNumberBlock />
        </div>
        <div className={style.status} data-reveal-group data-reveal-now>
          <span className={style.statusMuted}>Creative developer</span>
          <span>Available for freelancing</span>
        </div>
        <nav className={style.social} aria-label="Social" data-reveal-group data-reveal-now>
          {SOCIAL.map(({ href, label, popupLabel }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
              data-cursor-popup={popupLabel}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </main>
  )
}
