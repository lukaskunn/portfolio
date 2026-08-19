import { defineArrayMember, defineField, defineType } from "sanity"

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services page",
  type: "document",
  fields: [
    defineField({ name: "seo", type: "seo" }),
    defineField({ name: "heroTitle", type: "localeText", validation: (rule) => rule.required() }),
    defineField({ name: "heroSectionLabel", title: "Hero section label", type: "localeString", validation: (rule) => rule.required() }),
    defineField({ name: "scrollCueLabel", type: "localeString" }),
    defineField({ name: "helpTitle", title: "\"I can help you with\" title", type: "localeString" }),
    defineField({ name: "helpSectionLabel", type: "localeString" }),
    defineField({ name: "servicesTitle", type: "localeString" }),
    defineField({ name: "servicesSectionLabel", type: "localeString" }),
    defineField({
      name: "services",
      title: "What I do",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "service",
          fields: [
            defineField({ name: "title", type: "localeString", validation: (rule) => rule.required() }),
            defineField({ name: "body", type: "localeText", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "title.pt" } },
        }),
      ],
    }),
    defineField({
      name: "serviceGroups",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "serviceGroup",
          fields: [
            defineField({ name: "title", type: "localeString", validation: (rule) => rule.required() }),
            defineField({
              name: "items",
              type: "array",
              of: [defineArrayMember({ type: "localeString" })],
            }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required() })],
            }),
            defineField({
              name: "size",
              type: "string",
              options: { list: ["small", "medium", "big"], layout: "radio" },
              initialValue: "medium",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "title.pt", media: "image" } },
        }),
      ],
    }),
    defineField({ name: "processTitle", type: "localeString" }),
    defineField({ name: "processSectionLabel", type: "localeString" }),
    defineField({
      name: "process",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "processStep",
          fields: [
            defineField({ name: "title", type: "localeString", validation: (rule) => rule.required() }),
            defineField({ name: "body", type: "localeText", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "title.pt" } },
        }),
      ],
    }),
    defineField({ name: "contactSectionLabel", title: "Contact section label", type: "localeString", validation: (rule) => rule.required() }),
  ],
  preview: { prepare: () => ({ title: "Services page" }) },
})
