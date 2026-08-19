import Footer from "@/components/Footer"
import ContactForm from "@/components/ContactForm"
import ScrollProgress from "@/components/ScrollProgress"
import style from "@/styles/services/services.module.scss"
import { buildMetadata } from "@/utils/metadata"
import ServicesBackdrop from "@/components/ServicesBackdrop"
import ServicesHero from "@/components/ServicesHero"
import ServicesHelp from "@/components/ServicesHelp"
import ServicesList from "@/components/ServicesList"
import ServicesProcess from "@/components/ServicesProcess"

export async function generateMetadata({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params
  return buildMetadata({
    title: "Services",
    description:
      "Design, development, or the full package. Research, art direction, interaction and build for brands that want a site that does more than just load fast.",
    path: `/${lang}/services`,
  })
}

export default function ServicesPage() {
  return (
    <>
      <main id="main-content" className="servicePage">
        <div className={style.page}>
          <div className={style.headerSpace} />
          <div className={style.backdropRegion}>
            <ServicesBackdrop />
            <ServicesHero />
          </div>

          <div className={style.scrollOver}>
            <ServicesHelp />
            <ServicesList />
            <ServicesProcess />

            <section id="contact" data-section="Contact" className={style.contact}>
              <ContactForm />
            </section>
          </div>
        </div>
      </main>
      <ScrollProgress />
      <Footer />
    </>
  )
}
