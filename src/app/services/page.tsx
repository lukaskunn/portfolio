import type { Metadata } from "next"
import Image from "next/image"
import Footer from "@/components/Footer"
import ContactForm from "@/components/ContactForm"
import style from "@/styles/services/services.module.scss"
import { SERVICES, SERVICE_GROUPS } from "@/utils/contants"
export const metadata: Metadata = {
  title: "Services — Lucas Oliveira",
}

const IMAGE_SIZE = {
  big: {
    className: style.imageBig,
    sizes: "(max-width: 767.98px) 1px, (max-width: 1023.98px) 320px, 437px",
  },
  medium: {
    className: style.imageMedium,
    sizes: "(max-width: 767.98px) 1px, (max-width: 1023.98px) 240px, 325px",
  },
  small: {
    className: style.imageSmall,
    sizes: "(max-width: 767.98px) 1px, (max-width: 1023.98px) 160px, 213px",
  },
}

export default function ServicesPage() {
  return (
    <>
      <main id="main-content" className="servicePage">
        <div className={style.page}>
          <div className={style.headerSpace} />
          <section className={style.hero}>
            <h1 className={style.heroTitle}>
              Transform your digital presence into awesome experience that connect your business to your audience
            </h1>
          </section>

          <section className={style.help}>
            <h2 className={style.helpTitle}>I can help you with:</h2>
            <div className={style.helpGrid}>
              {SERVICES.map(({ title, body }) => (
                <div key={title} className={style.card}>
                  <h3 className={style.cardTitle}>{title}</h3>
                  <p className={style.cardBody}>{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={style.services}>
            <h2 className={style.servicesTitle}>Services</h2>
            <ul className={style.servicesList}>
              {SERVICE_GROUPS.map(({ title, items, image, size }) => (
                <li key={title} className={style.serviceRow}>
                  <h3 className={style.serviceTitle}>{title}</h3>
                  <ul className={style.serviceItems}>
                    {items.map((item, index) => (
                      <li key={`${item}-${index}`}>{item}</li>
                    ))}
                  </ul>
                  <div className={`${style.serviceImage} ${IMAGE_SIZE[size].className}`}>
                    <Image
                      src={image}
                      alt=""
                      fill
                      style={{ objectFit: "cover" }}
                      sizes={IMAGE_SIZE[size].sizes}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className={style.contact}>
            <ContactForm />
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
