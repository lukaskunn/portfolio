import { FaArrowDown } from "react-icons/fa"
import style from "@/styles/components/ServicesHero.module.scss"

export interface ServicesHeroProps {
  title: string
  sectionLabel: string
  scrollCueLabel: string
}

const ServicesHero = ({ title, sectionLabel, scrollCueLabel }: ServicesHeroProps) => (
  <section className={style.hero} id="intro" data-section={sectionLabel}>
    <h1 className={style.heroTitle} data-reveal="lines">
      {title}
    </h1>
    <a href="#what-i-do" className={style.scrollCue} data-reveal="up">
      {scrollCueLabel}
      <span className={style.cueIcon} aria-hidden="true">
        <FaArrowDown size={16} focusable="false" />
        <FaArrowDown size={16} focusable="false" />
      </span>
    </a>
  </section>
)

export default ServicesHero
