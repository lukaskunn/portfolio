import style from "@/styles/components/ProjectDetails.module.scss"
import type { FieldLabels, ProjectDetail } from "@/types/content"

export interface ProjectDetailsProps {
  project: ProjectDetail
  labels: FieldLabels
}

const ProjectDetails = ({ project, labels }: ProjectDetailsProps) => {
  const details = [
    { label: labels.year, value: project.year },
    { label: labels.role, value: project.role },
    { label: labels.type, value: project.type },
    { label: labels.industry, value: project.industry },
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
        <span className={style.label}>{labels.technologies}</span>
        <span className={`${style.value} ${style.technologies}`}>
          {(project.technologies ?? []).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </span>
      </div>
    </div>
  )
}

export default ProjectDetails
