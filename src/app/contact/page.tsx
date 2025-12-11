import { PageHeader, ContactForm, ContactInfo } from "./components";
import styles from "@/styles/css/contact.module.css";
import type { NextPage } from "next";

const ContactPage: NextPage = () => {
  return (
    <section className={styles.contactContainer}>
      <div className={styles.contactContent}>
        <PageHeader />
        <ContactForm />
        <ContactInfo />
      </div>
    </section>
  );
};

export default ContactPage;
