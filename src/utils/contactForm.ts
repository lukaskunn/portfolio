import { z } from "zod"

// Split out of src/app/actions.ts: a "use server" file may only export async
// functions, and this schema/messages plumbing is plain data + a builder.

type ContactFieldMessages<K extends string> = {
  label: string
  required: boolean
  errors: Partial<Record<K, string>>
}

export type ContactMessages = {
  eyebrowLabel?: string
  titleMuted?: string
  title?: string
  optionalSuffixLabel?: string
  addOptionalLabel?: string
  submitLabel?: string
  sendingLabel?: string
  successMessage?: string
  fixFieldsMessage?: string
  rateLimitMessage?: string
  sendFailureMessage?: string
  name: ContactFieldMessages<"requiredError" | "minError" | "maxError">
  businessName: ContactFieldMessages<"maxError">
  phone: ContactFieldMessages<"maxError" | "invalidError">
  email: ContactFieldMessages<"invalidError" | "maxError">
  message: ContactFieldMessages<"requiredError" | "minError" | "maxError">
}

// Today's literal copy — used both as the schema default and as the fallback
// when the settings document can't be reached.
export const CONTACT_MESSAGES_FALLBACK: ContactMessages = {
  fixFieldsMessage: "Please fix the highlighted fields.",
  rateLimitMessage: "Too many messages. Try again in a few minutes.",
  sendFailureMessage: "Failed to send message. Please try again.",
  successMessage: "Message sent — I'll get back to you soon.",
  submitLabel: "Send message",
  sendingLabel: "Sending…",
  name: {
    label: "your name",
    required: true,
    errors: {
      requiredError: "Please enter your name",
      minError: "Your name needs at least 2 characters",
      maxError: "Keep your name under 100 characters",
    },
  },
  businessName: {
    label: "your business name",
    required: false,
    errors: { maxError: "Keep your business name under 100 characters" },
  },
  phone: {
    label: "your phone number",
    required: false,
    errors: {
      maxError: "Keep your phone number under 30 characters",
      invalidError: "Enter a valid phone number",
    },
  },
  email: {
    label: "your email",
    required: true,
    errors: {
      invalidError: "Enter a valid email address",
      maxError: "Enter a valid email address",
    },
  },
  message: {
    label: "your content idea",
    required: true,
    errors: {
      requiredError: "Please enter your project idea",
      minError: "Tell me a bit more — at least 10 characters",
      maxError: "Keep your message under 2000 characters",
    },
  },
}

const optionalString = (max: number, maxError: string) =>
  z
    .string()
    .max(max, maxError)
    .nullish()
    .transform((value) => (value?.trim() ? value.trim() : undefined))

export const buildContactSchema = (messages: ContactMessages) =>
  z.object({
    name: z
      .string({ error: messages.name.errors.requiredError })
      .trim()
      .min(2, messages.name.errors.minError)
      .max(100, messages.name.errors.maxError),
    businessName: optionalString(100, messages.businessName.errors.maxError ?? ""),
    phone: optionalString(30, messages.phone.errors.maxError ?? "").refine(
      (value) => !value || /^[\d\s()+-]{6,}$/.test(value),
      messages.phone.errors.invalidError
    ),
    email: z
      .email({ error: messages.email.errors.invalidError })
      .max(200, messages.email.errors.maxError),
    message: z
      .string({ error: messages.message.errors.requiredError })
      .trim()
      .min(10, messages.message.errors.minError)
      .max(2000, messages.message.errors.maxError),
  })

export const mergeFieldMessages = <K extends string>(
  value: Partial<ContactFieldMessages<K>> | undefined,
  fallback: ContactFieldMessages<K>
): ContactFieldMessages<K> => ({
  label: value?.label || fallback.label,
  required: typeof value?.required === "boolean" ? value.required : fallback.required,
  errors: Object.fromEntries(
    Object.entries(fallback.errors).map(([key, fallbackMessage]) => [
      key,
      value?.errors?.[key as K] || fallbackMessage,
    ])
  ) as Record<K, string>,
})
