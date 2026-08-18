import AboutHero from "@/components/AboutHero"
import AboutBio from "@/components/AboutBio"
import AboutContact from "@/components/AboutContact"
import style from "@/styles/about/about.module.scss"
import { buildMetadata } from "@/utils/metadata"

export const metadata = buildMetadata({
  title: "About",
  description:
    "Creative web developer and software engineer from São Paulo, building design-led websites and products for brands like Dexco, Motorola and KitchenAid.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <main id="main-content" className={`${style.page} aboutPage`}>
      <div className={style.headerSpacer} aria-hidden="true" />
      <AboutHero />
      <AboutBio />
      <AboutContact />
    </main>
  )
}
