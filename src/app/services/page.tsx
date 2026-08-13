import Image from "next/image"
import Footer from "@/components/Footer"
import ContactForm from "@/components/ContactForm"
import ScrollProgress from "@/components/ScrollProgress"
import style from "@/styles/services/services.module.scss"
import { SERVICES, SERVICE_GROUPS, PROCESS } from "@/utils/contants"
import { buildMetadata } from "@/utils/metadata"
import Grainient from '@/components/Grainient';
import { FaArrowDown } from "react-icons/fa"

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Design, development, or the full package. Research, art direction, interaction and build for brands that want a site that does more than just load fast.",
  path: "/services",
})

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
          <div className={style.backdropRegion}>
            <div className={style.backdrop}>
              <Grainient
                color1="#cecece"
                color2="#000000"
                color3="#fdfcfd"
                timeSpeed={0.5}
                colorBalance={0.1}
                warpStrength={2}
                warpFrequency={5}
                warpSpeed={5}
                warpAmplitude={200}
                blendAngle={45}
                blendSoftness={0.5}
                rotationAmount={500}
                noiseScale={3}
                grainAmount={0.2}
                grainScale={2}
                grainAnimated={false}
                contrast={3.5}
                gamma={1}
                saturation={1}
                centerX={0}
                centerY={0}
                zoom={0.85}
              />
            </div>
            <section className={style.hero} id="intro" data-section="Intro">
              <h1 className={style.heroTitle}>
                Transform your digital presence into awesome experience that connect your business to your audience
              </h1>
              <a href="#what-i-do" className={style.scrollCue}>
                Scroll to explore<FaArrowDown size={14} aria-hidden="true" focusable="false" />
              </a>
            </section>

          </div>

          <div className={style.scrollOver}>
            <section className={style.help} id="what-i-do" data-section="what i do">
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
            <section className={style.services} id="services" data-section="Services">
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

            <section className={style.process} id="process" data-section="Process">
              <h2 className={style.processTitle}>Process</h2>
              <ol className={style.processList}>
                {PROCESS.map(({ title, body }) => (
                  <li key={title} className={style.processItem}>
                    <div className={style.processContent}>
                      <h3 className={style.processItemTitle}>{title}</h3>
                      <p className={style.processBody}>{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="contact" data-section="Contact" className={style.contact}>
              <ContactForm />
            </section>
          </div>
        </div>
      </main>
      <ScrollProgress />
      <Footer />
    </>
  )
}
