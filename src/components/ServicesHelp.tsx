import type { ServiceCard } from "@/types/content"
import style from "@/styles/components/ServicesHelp.module.scss"

export interface ServicesHelpProps {
  title: string
  sectionLabel: string
  services: ServiceCard[]
}

const ServicesHelp = ({ title, sectionLabel, services }: ServicesHelpProps) => (
  <section className={style.help} id="what-i-do" data-section={sectionLabel}>
    <h2 className={style.helpTitle} data-reveal="lines">{title}</h2>
    <div className={style.helpGrid} data-reveal-group>
      {services.map(({ title, body }) => (
        <div key={title} className={style.card}>
          <h3 className={style.cardTitle}>{title}</h3>
          <p className={style.cardBody}>{body}</p>
        </div>
      ))}
    </div>
  </section>
)

export default ServicesHelp
