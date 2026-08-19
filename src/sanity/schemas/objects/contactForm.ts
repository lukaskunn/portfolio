import { defineField, defineType } from "sanity"

// One localised field per contactSchema (src/app/actions.ts) rule, so copy and
// validation messages can move to Sanity without the two ever drifting apart.
const requiredErrorField = defineField({ name: "requiredError", title: "Required error", type: "localeString" })
const minErrorField = defineField({ name: "minError", title: "Min length error", type: "localeString" })
const maxErrorField = defineField({ name: "maxError", title: "Max length error", type: "localeString" })
const invalidErrorField = defineField({ name: "invalidError", title: "Invalid format error", type: "localeString" })

const formField = (name: string, title: string, fields: ReturnType<typeof defineField>[], initialValue?: { label: { pt: string } }) =>
  defineField({
    name,
    title,
    type: "object",
    initialValue,
    fields: [
      defineField({ name: "label", type: "localeString", validation: (rule) => rule.required() }),
      defineField({ name: "required", type: "boolean", initialValue: true }),
      defineField({ name: "errors", type: "object", fields }),
    ],
  })

export const contactForm = defineType({
  name: "contactForm",
  title: "Contact form",
  type: "object",
  fields: [
    defineField({ name: "eyebrowLabel", type: "localeString" }),
    defineField({ name: "titleMuted", type: "localeString" }),
    defineField({ name: "title", type: "localeString" }),
    defineField({ name: "optionalSuffixLabel", type: "localeString" }),
    defineField({ name: "addOptionalLabel", type: "localeString" }),
    defineField({ name: "submitLabel", type: "localeString" }),
    defineField({ name: "sendingLabel", type: "localeString" }),
    defineField({ name: "successMessage", type: "localeString" }),
    defineField({ name: "fixFieldsMessage", type: "localeString" }),
    defineField({ name: "rateLimitMessage", type: "localeString" }),
    defineField({ name: "sendFailureMessage", type: "localeString" }),
    formField("name", "Name field", [requiredErrorField, minErrorField, maxErrorField]),
    formField("businessName", "Business name field", [maxErrorField]),
    formField("phone", "Phone field", [maxErrorField, invalidErrorField]),
    formField("email", "Email field", [invalidErrorField, maxErrorField]),
    formField(
      "message",
      "Message field",
      [requiredErrorField, minErrorField, maxErrorField],
      { label: { pt: "your content idea" } }
    ),
  ],
})
