import Link from "next/link"
import style from "@/styles/components/ProjectNav.module.scss"
import { NAV, PROJECT_LABELS } from "@/utils/contants"

export interface ProjectNavProps {
  nextSlug: string
}

const ProjectNav = ({ nextSlug }: ProjectNavProps) => (
  <div className={style.nav} data-reveal-group data-reveal-now>
    <Link href={NAV[0].href} transitionTypes={["nav-reveal"]} className={style.navLink}>
      <span aria-hidden="true">← </span>
      {PROJECT_LABELS.back}
    </Link>
    <Link href={`/project/${nextSlug}`} className={style.navLink}>
      {PROJECT_LABELS.next}
      <span aria-hidden="true"> →</span>
    </Link>
  </div>
)

export default ProjectNav
