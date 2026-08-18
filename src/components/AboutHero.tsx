import Image from "next/image"
import style from "@/styles/components/AboutHero.module.scss"

const AboutHero = () => (
  <div className={style.hero}>
    <h1 className={style.title} data-reveal="lines" data-reveal-now>
      creative web developer &<br />
      software engineer
    </h1>
    <div className={style.profileImage} data-reveal="curtain" data-reveal-now>
      <Image
        src="/assets/images/about/profile_image.jpg"
        alt="Portrait of Lucas Oliveira"
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 767.98px) calc(100vw - 40px), 252px"
        priority
      />
    </div>
  </div>
)

export default AboutHero
