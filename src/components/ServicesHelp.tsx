import type { ServiceCard } from "@/types/content"
import RichText from "@/components/RichText"
import style from "@/styles/components/ServicesHelp.module.scss"
import { PiStarFourFill } from "react-icons/pi";


export interface ServicesHelpProps {
  title: string
  sectionLabel: string
  services: ServiceCard[]
}

const ServicesHelp = ({ title, sectionLabel, services }: ServicesHelpProps) => (
  <section className={style.help} id="what-i-do" data-section={sectionLabel}>
    <h2 className={style.helpTitle} data-reveal="lines">{title}</h2>
    <div className={style.helpGrid} data-reveal-group>
      {services.map(({ title, body }, index) => {
        const isLast = index === services.length - 1

        return (
          <div key={title} className={style.card}>
            <h3 className={style.cardTitle}>
              {isLast && (
                <PiStarFourFill size={20} className={style.cardTitleIcon} aria-hidden="true" focusable="false" />
              )}
              {title}
            </h3>
            <RichText value={body} paragraphClass={style.cardBody} highlightClass={style.highlight} reveal={false} />
          </div>
        )
      })}
    </div>
  </section>
)

export default ServicesHelp
