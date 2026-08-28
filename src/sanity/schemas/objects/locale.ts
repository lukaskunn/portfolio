import { defineField, defineType } from "sanity"

// Field-level i18n: every localised field is an object with `pt` (required,
// primary) and `en`. Queried as `coalesce(field[$lang], field.pt)`.
export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({ name: "pt", title: "Português", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
})

export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({ name: "pt", title: "Português", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "en", title: "English", type: "text", rows: 4 }),
  ],
})

// Only decorator allowed is "Highlight" — styles/lists are locked to plain
// paragraphs so RichText (src/components/RichText.tsx) only has to render
// block.normal and marks.highlight.
const highlightBlock = {
  type: "block" as const,
  styles: [{ title: "Normal", value: "normal" }],
  lists: [],
  marks: {
    decorators: [{ title: "Highlight", value: "highlight" }],
    annotations: [],
  },
}

export const localeBlock = defineType({
  name: "localeBlock",
  title: "Localized rich text",
  type: "object",
  fields: [
    defineField({
      name: "pt",
      title: "Português",
      type: "array",
      of: [highlightBlock],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "en", title: "English", type: "array", of: [highlightBlock] }),
  ],
})
