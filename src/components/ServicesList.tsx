import Image from "next/image"
import { SERVICE_GROUPS } from "@/utils/contants"
import style from "@/styles/components/ServicesList.module.scss"

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

const ServicesList = () => (
  <section className={style.services} id="services" data-section="Services">
    <h2 className={style.servicesTitle} data-reveal="lines">Services</h2>
    <ul className={style.servicesList}>
      {SERVICE_GROUPS.map(({ title, items, image, size }) => (
        <li key={title} className={style.serviceRow} data-reveal-group>
          <h3 className={style.serviceTitle}>{title}</h3>
          <ul className={style.serviceItems}>
            {items.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
          <div className={`${style.serviceImage} ${IMAGE_SIZE[size].className}`} data-reveal="curtain">
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
)

export default ServicesList
