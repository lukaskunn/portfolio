import ProjectLiveLink from "./ProjectLiveLink"
import style from "@/styles/components/ProjectDetails.module.scss"
import type { FieldLabels, ProjectDetail } from "@/types/content"

export interface ProjectDetailsProps {
  project: ProjectDetail
  labels: FieldLabels
  liveLinkLabel?: string
}

const ProjectDetails = ({ project, labels, liveLinkLabel }: ProjectDetailsProps) => {
  const details = [
    { label: labels.client, value: project.client },
    { label: labels.year, value: project.year },
    { label: labels.role, value: project.role },
    { label: labels.type, value: project.type },
    { label: labels.industry, value: project.industry },
  ] as const

  const liveUrl = project.showLiveLink ? project.liveUrl : undefined
  const liveRowLabel = liveLinkLabel || labels.live

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
      {liveUrl && (
        <div className={style.row}>
          <span className={style.label}>{liveRowLabel}</span>
          <span className={style.value}>
            <ProjectLiveLink href={liveUrl} slug={project.slug} />
          </span>
        </div>
      )}
    </div>
  )
}

export default ProjectDetails
