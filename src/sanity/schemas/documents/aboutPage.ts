import { defineArrayMember, defineField, defineType } from "sanity"

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({ name: "seo", type: "seo" }),
    defineField({ name: "heroTitle", type: "localeText", validation: (rule) => rule.required() }),
    defineField({ name: "bio", type: "localeBlock", validation: (rule) => rule.required() }),
    defineField({
      name: "clients",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({ name: "clientsLabel", type: "localeString" }),
    defineField({
      name: "profileImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required() })],
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
})
