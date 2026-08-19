import Link from "next/link"
import style from "@/styles/components/ProjectNav.module.scss"
import type { Lang } from "@/utils/locale"

export interface ProjectNavProps {
  nextSlug: string
  lang: Lang
  backLabel?: string
  nextLabel?: string
}

const ProjectNav = ({ nextSlug, lang, backLabel, nextLabel }: ProjectNavProps) => (
  <div className={style.nav} data-reveal-group data-reveal-now>
    <Link href={`/${lang}#works`} transitionTypes={["nav-reveal"]} className={style.navLink}>
      <span aria-hidden="true">← </span>
      {backLabel}
    </Link>
    <Link href={`/${lang}/project/${nextSlug}`} className={style.navLink}>
      {nextLabel}
      <span aria-hidden="true"> →</span>
    </Link>
  </div>
)

export default ProjectNav
