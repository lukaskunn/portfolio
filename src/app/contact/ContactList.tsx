'use client'
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

import styles from "@/styles/css/contact.module.css";

const ContactList = () => {
  const { currentContent } = useLanguage();
  const { contact } = currentContent;

  if (contact.socialLinks.length < 1) {
    return <h2 dangerouslySetInnerHTML={{ __html: "nothing to show yet!" }} />;
  }

  return contact.socialLinks.map((contactItem, index: number) => (
    <div className={styles["contact-item"]} key={`contact-${index}`}>
      {contactItem.name}{" "}
      <a
        href={contactItem.url}
        target="_blank"
        rel="noopener noreferrer"
        dangerouslySetInnerHTML={{ __html: contactItem.name }}
      />
    </div>
  ));
};

export default ContactList;
