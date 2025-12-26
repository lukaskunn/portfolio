import { PageHeader, ContactForm, ContactInfo } from "./components";
import styles from "@/styles/css/contact.module.css";
import { getContactContent } from "@/sanity/lib/fetch";
import generateMetadataUtil from "@/utils/generateMetadata";

export async function generateMetadata() {
  const contact = await getContactContent();
  return generateMetadataUtil(contact.seo, undefined, undefined, undefined, "/contact");
}

export default async function ContactPage() {
  const contact = await getContactContent();

  return (
    <main id="main-content" role="main" aria-label="Contact page content">
      <section className={styles.contactContainer}>
        <div className={styles.contactContent}>
          <PageHeader data={contact} />
          <ContactForm data={contact} />
          <ContactInfo data={contact} />
        </div>
      </section>
    </main>
  );
}
