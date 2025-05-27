import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import styles from "./Contact.module.css";

function Contact() {
  const { currentLanguage } = useLanguage();
  const { contact } = currentLanguage;

  return (
    <>
      <section className={styles.contactContainer}>
        <div className={styles.contact} id="contact">
          <div className={styles.contactSide}>
            <h2 dangerouslySetInnerHTML={{ __html: contact.title }} />
            {contact.contacts.map((contact: any, index: any) => {
              return (
                <p key={index}>
                  {contact.type}{" "}
                  <a
                    href={contact.urlLink}
                    target="__blank"
                    dangerouslySetInnerHTML={{ __html: contact.linkText }}
                  />
                </p>
              );
            })}
          </div>
          <img
            src="https://64.media.tumblr.com/1acd142680aeae7379ad1871d50ab113/tumblr_pxbg52Fhlm1xggw0so1_500.gifv"
            alt=""
          />
        </div>
      </section>
    </>
  );
}

export default Contact;
