import Link from "next/link"
import style from "@/styles/components/ProjectNav.module.scss"
import { PROJECT_LABELS } from "@/utils/contants"
import type { Lang } from "@/utils/locale"

export interface ProjectNavProps {
  nextSlug: string
  lang: Lang
}

const ProjectNav = ({ nextSlug, lang }: ProjectNavProps) => (
  <div className={style.nav} data-reveal-group data-reveal-now>
    <Link href={`/${lang}#works`} transitionTypes={["nav-reveal"]} className={style.navLink}>
      <span aria-hidden="true">← </span>
      {PROJECT_LABELS.back}
    </Link>
    <Link href={`/${lang}/project/${nextSlug}`} className={style.navLink}>
      {PROJECT_LABELS.next}
      <span aria-hidden="true"> →</span>
    </Link>
  </div>
)

export default ProjectNav
