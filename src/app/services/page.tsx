import type { Metadata } from "next"
import Footer from "@/components/Footer"
import ContactForm from "@/components/ContactForm"
import style from "@/styles/services/services.module.scss"

export const metadata: Metadata = {
  title: "Services — Lucas Oliveira",
}

// Placeholder copy — swap for the real text.
const SERVICES = [
  {
    title: "Design",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta eu massa quis eleifend. Nam at euismod enim. Praesent vitae nunc vel est molestie tincidunt in nec urna. Nunc sollicitudin euismod nibh, faucibus consectetur lorem finibus vitae. Aliquam eu risus sit amet massa pulvinar sagittis eget id magna. Nam a cursus nisl. Donec pretium, tellus eget hendrerit venenatis.",
  },
  {
    title: "Development",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta eu massa quis eleifend. Nam at euismod enim. Praesent vitae nunc vel est molestie tincidunt in nec urna. Nunc sollicitudin euismod nibh, faucibus consectetur lorem finibus vitae. Aliquam eu risus sit amet massa pulvinar sagittis eget id magna. Nam a cursus nisl. Donec pretium, tellus eget hendrerit venenatis.",
  },
  {
    title: "The full package",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta eu massa quis eleifend. Nam at euismod enim. Praesent vitae nunc vel est molestie tincidunt in nec urna. Nunc sollicitudin euismod nibh, faucibus consectetur lorem finibus vitae. Aliquam eu risus sit amet massa pulvinar sagittis eget id magna. Nam a cursus nisl. Donec pretium, tellus eget hendrerit venenatis.",
  },
] as const

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

          <section className={style.contact}>
            <ContactForm />
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
