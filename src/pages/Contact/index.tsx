import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import styles from "./Contact.module.css";
import AnimatePosOpacity from "../../utils/AnimatePosOpacity";

function Contact() {
  const { currentLanguage } = useLanguage();
  const { contact } = currentLanguage;

  return (
    <>
      <section className={styles.contactContainer}>
        <div className={styles.contact} id="contact">
          <div className={styles.contactSide}>
            <AnimatePosOpacity
              from={{ y: "200px", opacity: 0 }}
              to={{ y: 0, opacity: 1 }}
              durationIn={0.8}
              durationOut={0.6}
              delay={1} // stagger effect based on index
              set={{ y: "200px", opacity: 0 }}
            >
              <h2 dangerouslySetInnerHTML={{ __html: contact.title }} />
            </AnimatePosOpacity>
            {contact.contacts.map((contact: any, index: any) => {
              return (
                <AnimatePosOpacity
                  from={{ y: "200px", opacity: 0 }}
                  to={{ y: 0, opacity: 1 }}
                  durationIn={0.8}
                  durationOut={0.6}
                  delay={1.2 + index * 0.1} // stagger effect based on index
                  set={{ y: "200px", opacity: 0 }}
                >
                  <div key={index} className={styles["contact-item"]}>
                    {contact.type}{" "}
                    <a
                      href={contact.urlLink}
                      target="__blank"
                      dangerouslySetInnerHTML={{ __html: contact.linkText }}
                    />
                  </div>
                </AnimatePosOpacity>
              );
            })}
          </div>
          <AnimatePosOpacity
            from={{ y: "200px", opacity: 0 }}
            to={{ y: 0, opacity: 1 }}
            durationIn={0.8}
            durationOut={0.6}
            delay={0.8} // stagger effect based on index
            set={{ y: "200px", opacity: 0 }}
          >
            <img
              src="https://64.media.tumblr.com/1acd142680aeae7379ad1871d50ab113/tumblr_pxbg52Fhlm1xggw0so1_500.gifv"
              alt=""
            />
          </AnimatePosOpacity>
        </div>
      </section>
    </>
  );
}

export default Contact;
