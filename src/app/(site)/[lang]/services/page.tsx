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
import { sanityFetch } from "@/sanity/client"
import { servicesPageQuery, settingsQuery, contactMessagesQuery } from "@/sanity/queries"
import type { ServicesPage as ServicesPageContent, Settings } from "@/types/content"
import { CONTACT_MESSAGES_FALLBACK, type ContactMessages } from "@/utils/contactForm"

export async function generateMetadata({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params
  const servicesPage = await sanityFetch<ServicesPageContent | null>(servicesPageQuery, { lang })
  return buildMetadata({ seo: servicesPage?.seo, title: "Services", path: `/${lang}/services` })
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params

  const [servicesPage, settings, contactMessages] = await Promise.all([
    sanityFetch<ServicesPageContent | null>(servicesPageQuery, { lang }),
    sanityFetch<Settings | null>(settingsQuery, { lang }),
    sanityFetch<Partial<ContactMessages> | null>(contactMessagesQuery, { lang }),
  ])

  const messages: ContactMessages = contactMessages
    ? { ...CONTACT_MESSAGES_FALLBACK, ...contactMessages }
    : CONTACT_MESSAGES_FALLBACK

  return (
    <>
      <main id="main-content" className="servicePage">
        <div className={style.page}>
          <div className={style.headerSpace} />
          <div className={style.backdropRegion}>
            <ServicesBackdrop />
            <ServicesHero
              title={servicesPage?.heroTitle ?? ""}
              sectionLabel={servicesPage?.heroSectionLabel ?? ""}
              scrollCueLabel={servicesPage?.scrollCueLabel ?? ""}
            />
          </div>

          <div className={style.scrollOver}>
            <ServicesHelp
              title={servicesPage?.helpTitle ?? ""}
              sectionLabel={servicesPage?.helpSectionLabel ?? ""}
              services={servicesPage?.services ?? []}
            />
            <ServicesList
              title={servicesPage?.servicesTitle ?? ""}
              sectionLabel={servicesPage?.servicesSectionLabel ?? ""}
              serviceGroups={servicesPage?.serviceGroups ?? []}
            />
            <ServicesProcess
              title={servicesPage?.processTitle ?? ""}
              sectionLabel={servicesPage?.processSectionLabel ?? ""}
              process={servicesPage?.process ?? []}
            />

            <section id="contact" data-section={servicesPage?.contactSectionLabel ?? ""} className={style.contact}>
              <ContactForm
                messages={messages}
                contactInfo={{
                  email: settings?.email,
                  phone: settings?.phone,
                  copyEmailLabel: settings?.copyEmailLabel,
                  emailCopiedLabel: settings?.emailCopiedLabel,
                  copyPhoneLabel: settings?.copyPhoneLabel,
                  phoneCopiedLabel: settings?.phoneCopiedLabel,
                }}
              />
            </section>
          </div>
        </div>
      </main>
      <ScrollProgress />
      <Footer settings={settings ?? { defaultTitle: "", defaultDescription: "" }} />
    </>
  )
}
