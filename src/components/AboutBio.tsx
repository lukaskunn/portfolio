import type { PortableTextBlock } from "@portabletext/react"
import RichText from "@/components/RichText"
import style from "@/styles/components/AboutBio.module.scss"

export interface AboutBioProps {
  bio: PortableTextBlock[]
  clients?: string[]
  clientsLabel?: string
}

const AboutBio = ({ bio, clients, clientsLabel }: AboutBioProps) => (
  <div className={style.bioRow}>
    <div className={style.bio}>
      <RichText value={bio} highlightClass={style.highlight} revealNow />
    </div>
    <div className={style.clients}>
      <span className={style.clientsLabel} data-reveal="up" data-reveal-now>{clientsLabel}</span>
      <div className={style.clientsList} data-reveal="rise" data-reveal-now>
        {(clients ?? []).map((client) => (
          <span key={client} className={style.clientName}>
            <span>{client}</span>
          </span>
        ))}
      </div>
    </div>
  </div>
)

export default AboutBio
