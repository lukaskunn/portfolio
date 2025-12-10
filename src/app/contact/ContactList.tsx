'use client'
import React from "react";
// import { useLanguage } from "../../src/contexts/LanguageContext";
// import AnimatePosOpacity from "../../src/utils/AnimatePosOpacity";

import styles from "@/styles/css/contact.module.css";
import type { ContactItem } from "./types";

const contacts: ContactItem[] = [
  {
    "type": "[Email]",
    "linkText": "lucassioliveira098@gmail.com",
    "urlLink": "mailto:lucasisoliveira098@gmail.com?subject = Contact"
  },
  {
    "type": "[LinkedIn]",
    "linkText": "Lucas Oliveira",
    "urlLink": "https://linkedin.com/in/lucas-oliveira-997810198/"
  },
  {
    "type": "[GitHub]",
    "linkText": "lukaskunn",
    "urlLink": "https://github.com/lukaskunn"
  }
];

const ContactList = () => {
  // const { currentLanguage } = useLanguage();
  // const { contact } = currentLanguage;
  // const { contacts } = contact;

  if (contacts.length < 1) {
    return <h2 dangerouslySetInnerHTML={{ __html: "nothing to show yet!" }} />;
  }

  return contacts.map((contactItem: ContactItem, index: number) => (
    // <AnimatePosOpacity
    //   key={`contact-${index}`} // Key moved to outermost element
    //   from={{ y: "200px", opacity: 0 }}
    //   to={{ y: 0, opacity: 1 }}
    //   durationIn={0.8}
    //   durationOut={0.6}
    //   delay={1.2 + index * 0.1}
    //   set={{ y: "200px", opacity: 0 }}
    // >
      <div className={styles["contact-item"]} key={`contact-${index}`}>
        {contactItem.type}{" "}
        <a
          href={contactItem.urlLink}
          target="_blank" // Fixed typo from "__blank" to "_blank"
          rel="noopener noreferrer" // Added security best practice
          dangerouslySetInnerHTML={{ __html: contactItem.linkText }}
        />
      </div>
    // </AnimatePosOpacity>
  ));
};

export default ContactList;
