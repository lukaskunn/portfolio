import Image from "next/image"
import { imageUrl } from "@/sanity/image"
import type { ServiceGroup } from "@/types/content"
import style from "@/styles/components/ServicesList.module.scss"

export interface ServicesListProps {
  title: string
  sectionLabel: string
  serviceGroups: ServiceGroup[]
}

const IMAGE_SIZE = {
  big: {
    className: style.imageBig,
    sizes: "(max-width: 767.98px) 1px, (max-width: 1023.98px) 320px, 437px",
    width: 437,
  },
  medium: {
    className: style.imageMedium,
    sizes: "(max-width: 767.98px) 1px, (max-width: 1023.98px) 240px, 325px",
    width: 325,
  },
  small: {
    className: style.imageSmall,
    sizes: "(max-width: 767.98px) 1px, (max-width: 1023.98px) 160px, 213px",
    width: 213,
  },
}

const ServicesList = ({ title, sectionLabel, serviceGroups }: ServicesListProps) => (
  <section className={style.services} id="services" data-section={sectionLabel}>
    <h2 className={style.servicesTitle} data-reveal="lines">{title}</h2>
    <ul className={style.servicesList}>
      {serviceGroups.map(({ title, items, image, size }) => {
        const imageSize = IMAGE_SIZE[size]
        const src = imageUrl(image, imageSize.width)

        return (
          <li key={title} className={style.serviceRow} data-reveal-group>
            <h3 className={style.serviceTitle}>{title}</h3>
            <ul className={style.serviceItems}>
              {(items ?? []).map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
            {src && (
              <div className={`${style.serviceImage} ${imageSize.className}`} data-reveal="curtain">
                <Image
                  src={src}
                  alt={image?.alt ?? ""}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes={imageSize.sizes}
                />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  </section>
)

export default ServicesList
