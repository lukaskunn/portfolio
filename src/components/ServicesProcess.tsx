import type { ProcessStep } from "@/types/content"
import style from "@/styles/components/ServicesProcess.module.scss"

export interface ServicesProcessProps {
  title: string
  sectionLabel: string
  process: ProcessStep[]
}

const ServicesProcess = ({ title, sectionLabel, process }: ServicesProcessProps) => (
  <section className={style.process} id="process" data-section={sectionLabel}>
    <h2 className={style.processTitle} data-reveal="lines">{title}</h2>
    <ol className={style.processList}>
      {process.map(({ title, body }) => (
        <li key={title} className={style.processItem} data-reveal-index>
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
