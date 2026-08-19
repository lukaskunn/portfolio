"use client"

import { useFormStatus } from "react-dom"
import type { ContactState } from "@/app/actions"
import type { ContactMessages } from "@/utils/contactForm"
import style from "@/styles/components/ContactSubmitBlock.module.scss"

export interface ContactSubmitBlockProps {
  state: ContactState
  variant: "desktop" | "mobile"
  messages: ContactMessages
}

const SubmitButton = ({ messages }: { messages: ContactMessages }) => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" className={style.submit} disabled={pending}>
      {pending ? messages.sendingLabel : messages.submitLabel}
    </button>
  )
}

const ContactSubmitBlock = ({ state, variant, messages }: ContactSubmitBlockProps) => (
  <div
    className={`${style.submitBlock} ${
      variant === "desktop" ? style.submitBlockDesktop : style.submitBlockMobile
    }`}
  >
    <SubmitButton messages={messages} />
    {state.status === "success" && (
      <p className={style.success} role="status" aria-live="polite">
        {messages.successMessage}
      </p>
    )}
    {state.status === "error" && state.message && (
      <p className={style.error} role="alert">
        {state.message}
      </p>
    )}
  </div>
)

export default ContactSubmitBlock
