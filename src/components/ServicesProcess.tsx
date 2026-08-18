import { PROCESS } from "@/utils/contants"
import style from "@/styles/components/ServicesProcess.module.scss"

const ServicesProcess = () => (
  <section className={style.process} id="process" data-section="Process">
    <h2 className={style.processTitle} data-reveal="lines">Process</h2>
    <ol className={style.processList}>
      {PROCESS.map(({ title, body }) => (
        <li key={title} className={style.processItem}>
          <div className={style.processContent} data-reveal-group>
            <h3 className={style.processItemTitle}>{title}</h3>
            <p className={style.processBody}>{body}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
)

export default ServicesProcess
