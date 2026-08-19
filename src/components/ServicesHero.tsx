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
      {scrollCueLabel}<FaArrowDown size={14} aria-hidden="true" focusable="false" />
    </a>
  </section>
)

export default ServicesHero
