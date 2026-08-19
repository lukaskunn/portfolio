import { defineArrayMember, defineField, defineType } from "sanity"

// Mirrors src/types/project.ts. `description` is the only localised body;
// the rest are short labels that still need PT/EN.
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "seo", type: "seo" }),
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "client", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "type", title: "Type", type: "localeString", validation: (rule) => rule.required() }),
    defineField({ name: "industry", type: "localeString", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "localeString", validation: (rule) => rule.required() }),
    defineField({ name: "year", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "technologies",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      validation: (rule) => rule.unique(),
    }),
    defineField({ name: "description", type: "localeBlock", validation: (rule) => rule.required() }),
    defineField({ name: "showLiveLink", title: "Show live link", type: "boolean", initialValue: false }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
      hidden: ({ parent }) => !parent?.showLiveLink,
      validation: (rule) =>
        rule.custom((value, context) =>
          (context.parent as { showLiveLink?: boolean })?.showLiveLink && !value
            ? "Required while the live link is shown"
            : true,
        ),
    }),
    defineField({
      name: "images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required() })],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Lower comes first on the homepage.",
      type: "number",
    }),
  ],
  orderings: [
    { name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "client", media: "images.0" },
  },
})
