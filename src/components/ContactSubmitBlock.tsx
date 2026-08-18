"use client"

import { useFormStatus } from "react-dom"
import type { ContactState } from "@/app/actions"
import style from "@/styles/components/ContactSubmitBlock.module.scss"

export interface ContactSubmitBlockProps {
  state: ContactState
  variant: "desktop" | "mobile"
}

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" className={style.submit} disabled={pending}>
      {pending ? "Sending…" : "Send message"}
    </button>
  )
}

const ContactSubmitBlock = ({ state, variant }: ContactSubmitBlockProps) => (
  <div
    className={`${style.submitBlock} ${
      variant === "desktop" ? style.submitBlockDesktop : style.submitBlockMobile
    }`}
  >
    <SubmitButton />
    {state.status === "success" && (
      <p className={style.success} role="status" aria-live="polite">
        Message sent — I&apos;ll get back to you soon.
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
