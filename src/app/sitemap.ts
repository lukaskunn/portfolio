import type { MetadataRoute } from "next"
import { SITE_URL, WORKS } from "@/utils/contants"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/about", ...WORKS.map((work) => `/project/${work.slug}`)]

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }))
}
