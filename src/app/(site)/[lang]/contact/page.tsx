import ContactForm from "@/components/ContactForm"
import style from "@/styles/contact/contact.module.scss"
import { buildMetadata } from "@/utils/metadata"
import { sanityFetch } from "@/sanity/client"
import { settingsQuery, contactMessagesQuery } from "@/sanity/queries"
import type { Settings } from "@/types/content"
import { CONTACT_MESSAGES_FALLBACK, type ContactMessages } from "@/utils/contactForm"

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params

  // buildMetadata's DEFAULT_DESCRIPTION is hardcoded English; settings carries
  // the localised one, so the PT page doesn't ship an English description.
  let description: string | undefined
  try {
    const settings = await sanityFetch<Settings | null>(settingsQuery, { lang })
    description = settings?.defaultDescription
  } catch (error: unknown) {
    console.error("Failed to fetch contact page metadata:", error)
  }

  return buildMetadata({
    title: lang === "pt" ? "Contato" : "Contact",
    description,
    path: `/${lang}/contact`,
  })
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params

  let settings: Settings | null = null
  let messages: ContactMessages = CONTACT_MESSAGES_FALLBACK

  try {
    const [fetchedSettings, fetchedMessages] = await Promise.all([
      sanityFetch<Settings | null>(settingsQuery, { lang }),
      sanityFetch<Partial<ContactMessages> | null>(contactMessagesQuery, { lang }),
    ])
    settings = fetchedSettings
    messages = fetchedMessages ? { ...CONTACT_MESSAGES_FALLBACK, ...fetchedMessages } : CONTACT_MESSAGES_FALLBACK
  } catch (error: unknown) {
    console.error("Failed to fetch contact page data:", error)
  }

  return (
    <main id="main-content" className={`${style.page} contactPage`}>
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
    </main>
  )
}
