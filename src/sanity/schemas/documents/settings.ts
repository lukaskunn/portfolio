import { defineArrayMember, defineField, defineType } from "sanity"

const navItem = defineField({
  name: "pages",
  title: "Pages",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      name: "navItem",
      fields: [
        defineField({ name: "label", type: "localeString", validation: (rule) => rule.required() }),
        defineField({
          name: "action",
          type: "string",
          options: { list: ["link", "contact"] },
          initialValue: "link",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "href",
          type: "string",
          options: { list: ["/#works", "/services", "/about"] },
          hidden: ({ parent }) => parent?.action !== "link",
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context.parent as { action?: string } | undefined
              if (parent?.action === "link" && !value) return "Required when action is link"
              return true
            }),
        }),
        defineField({ name: "showInHeader", type: "boolean", initialValue: true }),
        defineField({ name: "showInFooter", type: "boolean", initialValue: true }),
      ],
      preview: { select: { title: "label.pt", subtitle: "href" } },
    }),
  ],
  group: "navigation",
})

export const settings = defineType({
  name: "settings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "general", title: "General" },
    { name: "navigation", title: "Navigation" },
    { name: "common", title: "Common" },
    { name: "contact", title: "Contact" },
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
    { name: "labels", title: "Field labels" },
    { name: "contactForm", title: "Contact form" },
  ],
  fields: [
    // General
    defineField({
      name: "defaultTitle",
      type: "localeString",
      validation: (rule) => rule.required(),
      group: "general",
    }),
    defineField({
      name: "defaultDescription",
      type: "localeText",
      validation: (rule) => rule.required(),
      group: "general",
    }),
    defineField({
      name: "loaderImages",
      title: "Loader images",
      description: "Images trailing the cursor during the intro loader.",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      group: "general",
    }),

    // Navigation
    navItem,
    defineField({ name: "sitemapLabel", type: "localeString", group: "navigation" }),

    // Common
    defineField({ name: "logoName", title: "Logo name", type: "string", initialValue: "Lucas Oliveira", group: "common" }),
    defineField({ name: "contactLabel", type: "localeString", group: "common" }),
    defineField({ name: "sendMessageLabel", type: "localeString", group: "common" }),
    defineField({ name: "viewProjectLabel", type: "localeString", group: "common" }),
    defineField({ name: "viewLiveProjectLabel", type: "localeString", group: "common" }),
    defineField({ name: "scrollToExploreLabel", type: "localeString", group: "common" }),
    defineField({ name: "roleLabel", type: "localeString", group: "common" }),
    defineField({ name: "available", type: "boolean", initialValue: true, group: "common" }),
    defineField({ name: "availableLabel", type: "localeString", group: "common" }),
    defineField({ name: "unavailableLabel", type: "localeString", group: "common" }),

    // Contact
    defineField({ name: "email", type: "localeString", group: "contact" }),
    defineField({ name: "copyEmailLabel", type: "localeString", group: "contact" }),
    defineField({ name: "emailCopiedLabel", type: "localeString", group: "contact" }),
    defineField({ name: "phone", type: "string", group: "contact" }),
    defineField({ name: "copyPhoneLabel", type: "localeString", group: "contact" }),
    defineField({ name: "phoneCopiedLabel", type: "localeString", group: "contact" }),
    defineField({
      name: "social",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "href", type: "url", validation: (rule) => rule.required() }),
            defineField({ name: "popupLabel", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
      group: "contact",
    }),
    defineField({ name: "socialLabel", type: "localeString", group: "contact" }),

    // Header
    defineField({ name: "menuLabel", type: "localeString", group: "header" }),
    defineField({ name: "closeMenuLabel", type: "localeString", group: "header" }),
    defineField({ name: "contactModalLabel", type: "localeString", group: "header" }),
    defineField({ name: "closeContactFormLabel", type: "localeString", group: "header" }),
    defineField({
      name: "switchLanguageLabel",
      title: "Language switcher popup",
      description: "Each value is the popup shown on the link that switches to that language, written in that language.",
      type: "localeString",
      group: "header",
    }),
    defineField({ name: "logoPopupLabel", title: "Logo popup label", type: "localeString", group: "header" }),

    // Footer
    defineField({ name: "ctaTitle", type: "localeText", group: "footer" }),
    defineField({ name: "ctaPopupLabel", type: "localeString", group: "footer" }),
    defineField({
      name: "latitude",
      title: "Latitude",
      type: "number",
      validation: (rule) => rule.min(-90).max(90),
      group: "footer",
    }),
    defineField({
      name: "longitude",
      title: "Longitude",
      type: "number",
      validation: (rule) => rule.min(-180).max(180),
      group: "footer",
    }),
    defineField({ name: "remoteFromLabel", type: "localeString", group: "footer" }),
    defineField({
      name: "timeOffsetAheadLabel",
      title: "Time offset (ahead) label",
      description: "{h} is replaced by the offset, unit included (\"4h\", \"4h30\") — do not add your own h. E.g. \"you are {h} ahead\".",
      type: "localeString",
      group: "footer",
    }),
    defineField({
      name: "timeOffsetBehindLabel",
      title: "Time offset (behind) label",
      description: "{h} is replaced by the offset, unit included (\"4h\", \"4h30\") — do not add your own h. E.g. \"you are {h} behind\".",
      type: "localeString",
      group: "footer",
    }),
    defineField({ name: "timeOffsetSameLabel", title: "Time offset (same timezone) label", type: "localeString", group: "footer" }),
    defineField({
      name: "timeZone",
      title: "Time zone",
      type: "string",
      initialValue: "America/Sao_Paulo",
      group: "footer",
    }),

    // Field labels — shared by the works table and the project page
    defineField({
      name: "fieldLabels",
      title: "Field labels",
      type: "object",
      group: "labels",
      fields: [
        defineField({ name: "projectName", type: "localeString" }),
        defineField({ name: "client", type: "localeString" }),
        defineField({ name: "type", type: "localeString" }),
        defineField({ name: "role", type: "localeString" }),
        defineField({ name: "year", type: "localeString" }),
        defineField({ name: "industry", type: "localeString" }),
        defineField({ name: "technologies", type: "localeString" }),
        defineField({ name: "description", type: "localeString" }),
        defineField({ name: "live", type: "localeString" }),
      ],
    }),

    // Contact form
    defineField({ name: "contactForm", type: "contactForm", group: "contactForm" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
})
