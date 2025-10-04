import PageTitle from "./PageTitle";
import ContactList from "./ContactList";
import SideImage from "./SideImage";

import styles from "./Contact.module.css"; 
import type { NextPage } from "next";

const ContactPage: NextPage = () => {
  return (
    <section className={styles.contactContainer}>
      <div className={styles.contact} id="contact">
        <div className={styles.contactSide}>
          <PageTitle />
          <ContactList />
        </div>
        <SideImage />
      </div>
    </section>
  );
}

export default ContactPage;
