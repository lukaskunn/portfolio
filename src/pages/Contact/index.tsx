import { useLanguage } from "../../contexts/LanguageContext";
import AnimatePosOpacity from "../../utils/AnimatePosOpacity";
import styles from "./Contact.module.css"; // Updated extension if using SCSS

// Define proper types
interface ContactItem {
  type: string;
  urlLink: string;
  linkText: string;
}

interface ContactText {
  title: string;
  contacts: ContactItem[];
}

function Contact() {
  const { currentLanguage } = useLanguage();
  const { contact } = currentLanguage as { contact: ContactText };

  return (
    <section className={styles.contactContainer}>
      <div className={styles.contact} id="contact">
        <div className={styles.contactSide}>
          <AnimatePosOpacity
            from={{ y: "200px", opacity: 0 }}
            to={{ y: 0, opacity: 1 }}
            durationIn={0.8}
            durationOut={0.6}
            delay={1}
            set={{ y: "200px", opacity: 0 }}
          >
            <h2 dangerouslySetInnerHTML={{ __html: contact.title }} />
          </AnimatePosOpacity>

          {contact.contacts.map((contactItem: ContactItem, index: number) => (
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
          ))}
        </div>

        <AnimatePosOpacity
          from={{ y: "200px", opacity: 0 }}
          to={{ y: 0, opacity: 1 }}
          durationIn={0.8}
          durationOut={0.6}
          delay={0.8}
          set={{ y: "200px", opacity: 0 }}
        >
          <img
            src="https://64.media.tumblr.com/1acd142680aeae7379ad1871d50ab113/tumblr_pxbg52Fhlm1xggw0so1_500.gifv"
            alt="Contact animation" // Added meaningful alt text
          />
        </AnimatePosOpacity>
      </div>
    </section>
  );
}

export default Contact;
