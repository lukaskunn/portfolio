import style from "@/styles/components/ProjectDetails.module.scss"
import type { Project } from "@/types/project"
import { PROJECT_LABELS } from "@/utils/contants"

export interface ProjectDetailsProps {
  project: Project
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const details = [
    { label: PROJECT_LABELS.year, value: project.year },
    { label: PROJECT_LABELS.role, value: project.role },
    { label: PROJECT_LABELS.type, value: project.type },
    { label: PROJECT_LABELS.industry, value: project.industry },
  ] as const

  return (
    <div className={style.detailsGroup} data-reveal-group data-reveal-now>
      {details.map(({ label, value }) => (
        <div key={label} className={style.row}>
          <span className={style.label}>{label}</span>
          <span className={style.value}>{value}</span>
        </div>
      ))}
      <div className={style.row}>
        <span className={style.label}>{PROJECT_LABELS.technologies}</span>
        <span className={`${style.value} ${style.technologies}`}>
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </span>
      </div>
    </div>
  )
}

export default ProjectDetails
