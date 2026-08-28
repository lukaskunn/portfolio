import Image from "next/image"
import style from "@/styles/components/ProjectMobileImage.module.scss"

export interface ProjectMobileImageProps {
  url?: string
  alt?: string
  loading?: "eager" | "lazy"
}

const ProjectMobileImage = ({ url, alt, loading }: ProjectMobileImageProps) => {
  if (!url) return null

  return (
    <div className={style.mobileImage} data-reveal="curtain" data-reveal-now>
      <Image src={url} alt={alt ?? ""} fill style={{ objectFit: "cover" }} sizes="100vw" loading={loading} />
    </div>
  )
}

export default ProjectMobileImage
