import { PageHeader, ContactForm, ContactInfo } from "./components";
import styles from "@/styles/css/contact.module.css";
import { getContactContent } from "@/sanity/lib/fetch";

export default async function ContactPage() {
  const contact = await getContactContent();

  return (
    <section className={styles.contactContainer}>
      <div className={styles.contactContent}>
        <PageHeader data={contact} />
        <ContactForm data={contact} />
        <ContactInfo data={contact} />
      </div>
    </section>
  );
}
