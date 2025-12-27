import dynamic from "next/dynamic";
import { PageHeader } from "./components";
import styles from "@/styles/css/contact.module.css";
import { getContactContent } from "@/sanity/lib/fetch";
import generateMetadataUtil from "@/utils/generateMetadata";

// Code-split form and contact info (below-the-fold)
const ContactForm = dynamic(() => import("./components/ContactForm"), {
  loading: () => <div style={{ minHeight: '400px' }} />
});
const ContactInfo = dynamic(() => import("./components/ContactInfo"));

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
