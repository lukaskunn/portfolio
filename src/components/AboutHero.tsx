import Image from "next/image"
import style from "@/styles/components/AboutHero.module.scss"

export interface AboutHeroProps {
  title: string
  image?: { url?: string; alt?: string }
}

const AboutHero = ({ title, image }: AboutHeroProps) => (
  <div className={style.hero}>
    <h1 className={style.title} data-reveal="lines" data-reveal-now>
      {title.split("\n").map((line, index, lines) => (
        <span key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </h1>
    <div className={style.profileImage} data-reveal="curtain" data-reveal-now>
      <Image
        src={image?.url ?? "/assets/images/about/profile_image.jpg"}
        alt={image?.alt ?? "Portrait of Lucas Oliveira"}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 767.98px) calc(100vw - 40px), 252px"
        priority
      />
    </div>
  </div>
)

export default AboutHero
