'use client'
import React from "react";
import { useLanguage } from "../../src/contexts/LanguageContext";
import AnimatePosOpacity from "../../src/utils/AnimatePosOpacity";

import styles from "./Contact.module.css";
import type { ContactItem } from "../../src/types/projectContentType";

const ContactList = () => {
  const { currentLanguage } = useLanguage();
  const { contact } = currentLanguage;
  const { contacts } = contact;

  if (contacts.length < 1) {
    return <h2 dangerouslySetInnerHTML={{ __html: "nothing to show yet!" }} />;
  }

  return contacts.map((contactItem: ContactItem, index: number) => (
    <AnimatePosOpacity
      key={`contact-${index}`} // Key moved to outermost element
      from={{ y: "200px", opacity: 0 }}
      to={{ y: 0, opacity: 1 }}
      durationIn={0.8}
      durationOut={0.6}
      delay={1.2 + index * 0.1}
      set={{ y: "200px", opacity: 0 }}
    >
      <div className={styles["contact-item"]}>
        {contactItem.type}{" "}
        <a
          href={contactItem.urlLink}
          target="_blank" // Fixed typo from "__blank" to "_blank"
          rel="noopener noreferrer" // Added security best practice
          dangerouslySetInnerHTML={{ __html: contactItem.linkText }}
        />
      </div>
    </AnimatePosOpacity>
  ));
};

export default ContactList;
