import { CLIENTS } from "@/utils/contants"
import style from "@/styles/components/AboutBio.module.scss"

const AboutBio = () => (
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
)

export default AboutBio
