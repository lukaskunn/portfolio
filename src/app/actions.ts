"use server"

import { headers } from "next/headers"
import { Resend } from "resend"
import { z } from "zod"

export type ContactField = "name" | "businessName" | "phone" | "email" | "message"

export type ContactState = {
  status: "idle" | "success" | "error"
  message?: string
  fieldErrors?: Partial<Record<ContactField, string>>
  values?: Partial<Record<ContactField, string>>
}

const optionalString = (max: number, label: string) =>
  z
    .string()
    .max(max, `Keep your ${label} under ${max} characters`)
    .nullish()
    .transform((value) => (value?.trim() ? value.trim() : undefined))

const contactSchema = z.object({
  name: z
    .string({ error: "Please enter your name" })
    .trim()
    .min(2, "Your name needs at least 2 characters")
    .max(100, "Keep your name under 100 characters"),
  businessName: optionalString(100, "business name"),
  phone: optionalString(30, "phone number").refine(
    (value) => !value || /^[\d\s()+-]{6,}$/.test(value),
    "Enter a valid phone number"
  ),
  email: z.email({ error: "Enter a valid email address" }).max(200, "Enter a valid email address"),
  message: z
    .string({ error: "Please enter your project idea" })
    .trim()
    .min(10, "Tell me a bit more — at least 10 characters")
    .max(2000, "Keep your message under 2000 characters"),
})

// In-memory and per-instance: resets on cold start. Swap for a shared store if abuse shows up.
const rateLimitHits = new Map<string, number[]>()
const globalHits: number[] = []
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX = 3
const GLOBAL_BURST_WINDOW_MS = 60 * 60 * 1000
// ponytail: per-instance cap, swap for Upstash if a shared counter ever matters
const GLOBAL_BURST_MAX = 20

const isRateLimited = (key: string) => {
  const now = Date.now()
  const timestamps = (rateLimitHits.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  )
  rateLimitHits.set(key, timestamps)
  return timestamps.length >= RATE_LIMIT_MAX
}

const recordSubmission = (key: string) => {
  const now = Date.now()
  const timestamps = (rateLimitHits.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  )
  timestamps.push(now)
  rateLimitHits.set(key, timestamps)
}

const isGlobalBurstLimited = () => {
  const now = Date.now()
  const recent = globalHits.filter((timestamp) => now - timestamp < GLOBAL_BURST_WINDOW_MS)
  globalHits.length = 0
  globalHits.push(...recent)
  return recent.length >= GLOBAL_BURST_MAX
}

const recordGlobalHit = () => {
  globalHits.push(Date.now())
}

const getClientIp = async () => {
  const headerList = await headers()
  const forwardedFor = headerList.get("x-forwarded-for")
  if (forwardedFor) return forwardedFor.split(",")[0].trim()
  return headerList.get("x-real-ip") ?? "anonymous"
}

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] as string
  )

const buildEmailHtml = ({
  name,
  businessName,
  phone,
  email,
  message,
}: {
  name: string
  businessName?: string
  phone?: string
  email: string
  message: string
}) => {
  const safeName = escapeHtml(name)
  const safeBusinessName = businessName ? escapeHtml(businessName) : undefined
  const safePhone = phone ? escapeHtml(phone) : undefined
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message)

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #e5e5dd;
        font-family: "Courier New", Courier, monospace;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 40px 20px;
      }
      .header {
        border-bottom: 2px solid #111;
        padding-bottom: 20px;
        margin-bottom: 20px;
      }
      .header h1 {
        margin: 0 0 8px;
        font-size: 32px;
      }
      .header p {
        margin: 0;
      }
      .content {
        background: #fff;
        border: 1px solid #111;
        padding: 30px;
      }
      .field {
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      .field:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }
      .field-label {
        font-size: 11px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #666;
        margin-bottom: 6px;
      }
      .field-value {
        font-size: 16px;
        word-wrap: break-word;
      }
      .field-value a {
        color: #111;
        text-decoration: underline;
      }
      .message-value {
        white-space: pre-wrap;
        line-height: 1.8;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        font-size: 11px;
        color: #666;
      }
      @media (max-width: 600px) {
        .container {
          padding: 20px 10px;
        }
        .content {
          padding: 20px;
        }
        .header h1 {
          font-size: 24px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>NEW CONTACT</h1>
        <p>Great collaboration starts here</p>
      </div>
      <div class="content">
        <div class="field">
          <div class="field-label">Name</div>
          <div class="field-value">${safeName}</div>
        </div>
        <div class="field">
          <div class="field-label">Email</div>
          <div class="field-value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
        </div>
        ${
          safeBusinessName
            ? `<div class="field">
          <div class="field-label">Business name</div>
          <div class="field-value">${safeBusinessName}</div>
        </div>`
            : ""
        }
        ${
          safePhone
            ? `<div class="field">
          <div class="field-label">Phone</div>
          <div class="field-value"><a href="tel:${safePhone}">${safePhone}</a></div>
        </div>`
            : ""
        }
        <div class="field">
          <div class="field-label">Message</div>
          <div class="field-value message-value">${safeMessage}</div>
        </div>
      </div>
      <div class="footer">
        <p>Sent from your portfolio contact form</p>
        <p>lucasoliveira.io</p>
      </div>
    </div>
  </body>
</html>
`
}

export const submitContact = async (
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> => {
  const values: Partial<Record<ContactField, string>> = {
    name: formData.get("name")?.toString() ?? "",
    businessName: formData.get("businessName")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
  }

  try {
    if (formData.get("website")) {
      return { status: "success" }
    }

    const ip = await getClientIp()
    if (isRateLimited(`ip:${ip}`)) {
      return {
        status: "error",
        message: "Too many messages. Try again in a few minutes.",
        values,
      }
    }

    if (isGlobalBurstLimited()) {
      return {
        status: "error",
        message: "Too many messages. Try again in a few minutes.",
        values,
      }
    }

    const result = contactSchema.safeParse({
      name: formData.get("name"),
      businessName: formData.get("businessName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
    })

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors
      return {
        status: "error",
        message: "Please fix the highlighted fields.",
        fieldErrors: {
          name: fieldErrors.name?.[0],
          businessName: fieldErrors.businessName?.[0],
          phone: fieldErrors.phone?.[0],
          email: fieldErrors.email?.[0],
          message: fieldErrors.message?.[0],
        },
        values,
      }
    }

    const { name, businessName, phone, email, message } = result.data

    if (isRateLimited(`email:${email.toLowerCase()}`)) {
      return {
        status: "error",
        message: "Too many messages. Try again in a few minutes.",
        values,
      }
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
      console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL environment variable")
      return { status: "error", message: "Failed to send message. Please try again.", values }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Contact from ${name}`,
      html: buildEmailHtml({ name, businessName, phone, email, message }),
    })

    if (error) {
      console.error("Resend send failed:", error)
      return { status: "error", message: "Failed to send message. Please try again.", values }
    }

    recordSubmission(`ip:${ip}`)
    recordSubmission(`email:${email.toLowerCase()}`)
    recordGlobalHit()

    return { status: "success" }
  } catch (error: unknown) {
    console.error("Failed to send contact email:", error)
    return { status: "error", message: "Failed to send message. Please try again.", values }
  }
}
