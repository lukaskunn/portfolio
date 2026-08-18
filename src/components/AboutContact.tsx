import EmailAndPhoneNumberBlock from "@/components/EmailAndPhoneNumberBlock"
import { SOCIAL } from "@/utils/contants"
import style from "@/styles/components/AboutContact.module.scss"

const AboutContact = () => (
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
)

export default AboutContact
