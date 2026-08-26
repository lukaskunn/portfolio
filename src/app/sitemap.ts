import type { MetadataRoute } from "next"
import { SITE_URL } from "@/utils/contants"
import { HREFLANG, LOCALES } from "@/utils/locale"
import { sanityFetch } from "@/sanity/client"
import { projectSlugsQuery } from "@/sanity/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = (await sanityFetch<string[]>(projectSlugsQuery)) ?? []
  const routes = ["", "/services", "/about", "/contact", ...slugs.map((slug) => `/project/${slug}`)]

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
