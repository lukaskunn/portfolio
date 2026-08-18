import style from "@/styles/components/ProjectDescription.module.scss"
import { PROJECT_LABELS } from "@/utils/contants"

export interface ProjectDescriptionProps {
  paragraphs: readonly string[]
}

const ProjectDescription = ({ paragraphs }: ProjectDescriptionProps) => (
  <div className={style.rowDescription}>
    <span className={style.label} data-reveal="up" data-reveal-now>{PROJECT_LABELS.description}</span>
    <div className={`${style.value} ${style.description}`}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={style.descriptionBody} data-reveal="lines" data-reveal-now>
          {paragraph}
        </p>
      ))}
    </div>
  </div>
)

export default ProjectDescription
