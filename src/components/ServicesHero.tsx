import { FaArrowDown } from "react-icons/fa"
import style from "@/styles/components/ServicesHero.module.scss"

const ServicesHero = () => (
  <section className={style.hero} id="intro" data-section="Intro">
    <h1 className={style.heroTitle} data-reveal="lines">
      Transform your digital presence into awesome experience that connect your business to your audience
    </h1>
    <a href="#what-i-do" className={style.scrollCue} data-reveal="up">
      Scroll to explore<FaArrowDown size={14} aria-hidden="true" focusable="false" />
    </a>
  </section>
)

export default ServicesHero
