import { defineField, defineType } from "sanity"

// Only the labels unique to /project/[slug]. The detail labels (year, role,
// type, client, industry, technologies, description) are shared with the works
// table and live in settings.fieldLabels.
export const projectPage = defineType({
  name: "projectPage",
  title: "Project page",
  type: "document",
  fields: [
    defineField({ name: "backLabel", type: "localeString" }),
    defineField({ name: "nextLabel", type: "localeString" }),
    defineField({ name: "openImageLabel", title: "Open image label", type: "localeString" }),
    defineField({ name: "closeImageLabel", title: "Close image label", type: "localeString" }),
  ],
  preview: { prepare: () => ({ title: "Project page" }) },
})
