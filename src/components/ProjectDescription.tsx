import type { PortableTextBlock } from "@portabletext/react"
import RichText from "@/components/RichText"
import style from "@/styles/components/ProjectDescription.module.scss"

export interface ProjectDescriptionProps {
  value: PortableTextBlock[]
  label: string
}

const ProjectDescription = ({ value, label }: ProjectDescriptionProps) => (
  <div className={style.rowDescription}>
    <span className={style.label} data-reveal="up" data-reveal-now>{label}</span>
    <div className={`${style.value} ${style.description}`}>
      <RichText value={value} paragraphClass={style.descriptionBody} revealNow />
    </div>
  </div>
)

export default ProjectDescription
