import Image from "next/image"
import style from "@/styles/components/ProjectMobileImage.module.scss"

export interface ProjectMobileImageProps {
  src: string
  loading?: "eager" | "lazy"
}

const ProjectMobileImage = ({ src, loading }: ProjectMobileImageProps) => (
  <div className={style.mobileImage} data-reveal="curtain" data-reveal-now>
    <Image src={src} alt="" fill style={{ objectFit: "cover" }} sizes="100vw" loading={loading} />
  </div>
)

export default ProjectMobileImage
