"use client"

import { track } from "@vercel/analytics"
import { FaArrowRight } from "react-icons/fa"
// ponytail: reuses ProjectDetails.module.scss instead of a second module.scss for one anchor
import style from "@/styles/components/ProjectDetails.module.scss"

const getHostname = (url?: string): string => {
  if (!url) return ""
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

export interface ProjectLiveLinkProps {
  href: string
  slug: string
}

const ProjectLiveLink = ({ href, slug }: ProjectLiveLinkProps) => {
  const hostname = getHostname(href)
  const handleClick = () => track("project_live_link_clicked", { project: slug })

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={style.liveLink}
      onClick={handleClick}
    >
      {hostname}
      <FaArrowRight size={16} className={style.liveIcon} aria-hidden="true" focusable="false" />
    </a>
  )
}

export default ProjectLiveLink
