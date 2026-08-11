import type { Metadata } from "next"
import Image from "next/image"
import EmailAndPhoneNumberBlock from "@/components/EmailAndPhoneNumberBlock"
import style from "@/styles/about/about.module.scss"
import { SOCIAL } from "@/utils/contants"

export const metadata: Metadata = {
  title: "About — Lucas Oliveira",
}

const CLIENTS = ["dexco", "Motorola", "KitchenAid"] as const

export default function AboutPage() {
  return (
    <main id="main-content" className={`${style.page} aboutPage`}>
      <div className={style.headerSpacer} aria-hidden="true" />

      <div className={style.hero}>
        <h1 className={style.title}>
          creative web developer &<br />
          software engineer
        </h1>
        <div className={style.profileImage}>
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
          <p>
            Hi, I'm Lucas. A <span className={style.highlight}>creative developer</span> and software engineer focusing on web design, motion and to create awesome experiences
          </p>
          <p>
            As a <span className={style.highlight}>creative developer</span>, I help individuals and companies to create awesome digital experiences and grow their business through design and engineering
          </p>
        </div>
        <div className={style.clients}>
          <span className={style.clientsLabel}>clients i worked on</span>
          <div className={style.clientsList}>
            {CLIENTS.map((client) => (
              <span key={client} className={style.clientName}>
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={style.contact}>
        <div className={style.getInTouch}>
          <span className={style.getInTouchLabel}>Get in touch</span>
          <EmailAndPhoneNumberBlock />
        </div>
        <div className={style.status}>
          <span className={style.statusMuted}>Creative developer</span>
          <span>Available for freelancing</span>
        </div>
        <nav className={style.social} aria-label="Social">
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
