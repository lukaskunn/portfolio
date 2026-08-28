import { defineField, defineType } from "sanity"

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "metaTitle", type: "localeString" }),
    defineField({ name: "metaDescription", type: "localeText" }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      fields: [defineField({ name: "alt", type: "string" })],
    }),
  ],
})
