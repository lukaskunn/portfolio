import { FaArrowRight } from "react-icons/fa"
import EmailAndPhoneNumberBlock from "@/components/EmailAndPhoneNumberBlock"
import type { ContactInfo, SocialLink } from "@/types/content"
import style from "@/styles/components/AboutContact.module.scss"

export interface AboutContactProps {
  contactInfo: ContactInfo
  contactLabel?: string
  social?: SocialLink[]
  roleLabel?: string
  available?: boolean
  availableLabel?: string
  unavailableLabel?: string
}

const AboutContact = ({
  contactInfo,
  contactLabel,
  social,
  roleLabel,
  available,
  availableLabel,
  unavailableLabel,
}: AboutContactProps) => (
  <div className={style.contact}>
    <div className={style.getInTouch} data-reveal-group data-reveal-now>
      <span className={style.getInTouchLabel}>{contactLabel}</span>
      <EmailAndPhoneNumberBlock info={contactInfo} />
    </div>
    <div className={style.status} data-reveal-group data-reveal-now>
      <span className={style.statusMuted}>{roleLabel}</span>
      <span>{available ? availableLabel : unavailableLabel}</span>
    </div>
    <nav className={style.social} aria-label="Social" data-reveal-group data-reveal-now>
      {(social ?? []).map(({ href, label, popupLabel }) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer"
          data-cursor-popup={popupLabel}
        >
          {label}
          <FaArrowRight size={12} className={style.socialIcon} aria-hidden="true" focusable="false" />
        </a>
      ))}
    </nav>
  </div>
)

export default AboutContact
