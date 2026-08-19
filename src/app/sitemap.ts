import type { MetadataRoute } from "next"
import { SITE_URL, WORKS } from "@/utils/contants"
import { HREFLANG, LOCALES } from "@/utils/locale"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/about", ...WORKS.map((work) => `/project/${work.slug}`)]

  return LOCALES.flatMap((lang) =>
    routes.map((route) => ({
      url: `${SITE_URL}/${lang}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ...Object.fromEntries(
            LOCALES.map((other) => [HREFLANG[other], `${SITE_URL}/${other}${route}`]),
          ),
          "x-default": `${SITE_URL}/en${route}`,
        },
      },
    })),
  )
}
