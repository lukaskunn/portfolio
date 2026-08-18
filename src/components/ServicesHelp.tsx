import { SERVICES } from "@/utils/contants"
import style from "@/styles/components/ServicesHelp.module.scss"

const ServicesHelp = () => (
  <section className={style.help} id="what-i-do" data-section="what i do">
    <h2 className={style.helpTitle} data-reveal="lines">I can help you with:</h2>
    <div className={style.helpGrid} data-reveal-group>
      {SERVICES.map(({ title, body }) => (
        <div key={title} className={style.card}>
          <h3 className={style.cardTitle}>{title}</h3>
          <p className={style.cardBody}>{body}</p>
        </div>
      ))}
    </div>
  </section>
)

export default ServicesHelp
