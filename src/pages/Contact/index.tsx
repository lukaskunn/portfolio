import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import styles from "./Contact.module.scss";
import Curve from "../../Layouts/Curve";

function Contact() {
    const { currentLanguage } = useLanguage();
    const { contact } = currentLanguage;

    return (
        <Curve>
            <section className={styles.contactContainer}>
                <div className={styles.contact} id="contact">
                    <div className={styles.contactSide}>
                        <h2>{contact.title}</h2>
                        {contact.contacts.map((contact: any, index: any) => {
                            return (
                                <p key={index}>
                                    {contact.type}{" "}
                                    <a href={contact.urlLink} target="__blank">
                                        {contact.linkText}
                                    </a>
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
        </Curve>
    );
}

export default Contact;
