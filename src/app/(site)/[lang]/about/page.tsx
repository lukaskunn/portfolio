import AboutHero from "@/components/AboutHero"
import AboutBio from "@/components/AboutBio"
import AboutContact from "@/components/AboutContact"
import style from "@/styles/about/about.module.scss"
import { buildMetadata } from "@/utils/metadata"
import { sanityFetch } from "@/sanity/client"
import { imageUrl } from "@/sanity/image"
import { aboutPageQuery, settingsQuery } from "@/sanity/queries"
import type { AboutPage as AboutPageContent, Settings } from "@/types/content"

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params
  const aboutPage = await sanityFetch<AboutPageContent | null>(aboutPageQuery, { lang })
  return buildMetadata({ seo: aboutPage?.seo, title: "About", path: `/${lang}/about` })
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params

  const [aboutPage, settings] = await Promise.all([
    sanityFetch<AboutPageContent | null>(aboutPageQuery, { lang }),
    sanityFetch<Settings | null>(settingsQuery, { lang }),
  ])

  return (
    <main id="main-content" className={`${style.page} aboutPage`}>
      <div className={style.headerSpacer} aria-hidden="true" />
      <AboutHero
        title={aboutPage?.heroTitle ?? ""}
        image={{ url: imageUrl(aboutPage?.profileImage, 504), alt: aboutPage?.profileImage?.alt }}
      />
      <AboutBio bio={aboutPage?.bio ?? []} clients={aboutPage?.clients} clientsLabel={aboutPage?.clientsLabel} />
      <AboutContact
        contactInfo={{
          email: settings?.email,
          phone: settings?.phone,
          copyEmailLabel: settings?.copyEmailLabel,
          emailCopiedLabel: settings?.emailCopiedLabel,
          copyPhoneLabel: settings?.copyPhoneLabel,
          phoneCopiedLabel: settings?.phoneCopiedLabel,
        }}
        contactLabel={settings?.contactLabel}
        social={settings?.social}
        roleLabel={settings?.roleLabel}
        available={settings?.available}
        availableLabel={settings?.availableLabel}
        unavailableLabel={settings?.unavailableLabel}
      />
    </main>
  )
}
