import { defineArrayMember, defineField, defineType } from "sanity"

// Marker syntax: one visual line per newline, [1]/[2]/[3] insert heroChips[n-1],
// "|" marks a mobile-only break. Parsed by src/utils/heroTitle.ts.
const withinFiveLines = (value?: string) => !value || value.split("\n").length <= 5

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({ name: "seo", type: "seo" }),
    defineField({
      name: "heroTitle",
      title: "Hero title",
      description: "One visual line per newline. Use [1] [2] [3] to place a chip, | for a mobile-only break.",
      type: "localeText",
      validation: (rule) =>
        rule
          .required()
          .custom((value: { pt?: string; en?: string } | undefined) => {
            if (!value) return true
            if (!withinFiveLines(value.pt) || !withinFiveLines(value.en)) {
              return "Hero title supports at most 5 lines"
            }
            return true
          }),
    }),
    defineField({
      name: "heroChips",
      title: "Hero chips",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "heroChip",
          fields: [
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
              fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required() })],
            }),
            defineField({ name: "color", type: "string" }),
          ],
          preview: { select: { media: "image" } },
        }),
      ],
      validation: (rule) => rule.max(3),
    }),
    defineField({ name: "heroSectionLabel", title: "Hero section label", type: "localeString", initialValue: { pt: "Intro" }, validation: (rule) => rule.required() }),
    defineField({ name: "heroLocationLabel", type: "localeString" }),
    defineField({ name: "heroCurrentRole", type: "localeString" }),
    defineField({
      name: "heroRoles",
      title: "Hero roles",
      description: "No trailing separator — the UI adds it.",
      type: "array",
      of: [defineArrayMember({ type: "localeString" })],
    }),
    defineField({ name: "worksTitle", type: "localeString", initialValue: { pt: "Curated works" } }),
    defineField({ name: "worksSectionLabel", title: "Works section label", type: "localeString", initialValue: { pt: "Works" } }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
})
