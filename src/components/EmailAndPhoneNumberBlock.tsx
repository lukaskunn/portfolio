'use client'
import { useState, useRef, useEffect } from "react"
import copyTextToClipBoard from "@/utils/copyTextToClipboard"
import type { ContactInfo } from "@/types/content"
import style from "@/styles/components/EmailAndPhoneNumberBlock.module.scss"

export interface EmailAndPhoneNumberBlockProps {
  info: ContactInfo
}

const EmailAndPhoneNumberBlock = ({ info }: EmailAndPhoneNumberBlockProps) => {
  const [copied, setCopied] = useState<"email" | "phone" | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const email = info.email ?? ""
  const phone = info.phone ?? ""

  const handleCopyTextToClipBoard = async (type: "email" | "phone", text: string) => {
    if (!(await copyTextToClipBoard(text))) return
    setCopied(type)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(null), 5000)
  }

  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <>
      <button
        type="button"
        className={style.copy}
        data-cursor-popup={copied === "email" ? info.emailCopiedLabel : info.copyEmailLabel}
        aria-label={`Copy email address ${email}`}
        onClick={() => {
          void handleCopyTextToClipBoard("email", email)
        }}
      >
        {email}
      </button>
      <button
        type="button"
        className={style.copy}
        data-cursor-popup={copied === "phone" ? info.phoneCopiedLabel : info.copyPhoneLabel}
        aria-label={`Copy phone number ${phone}`}
        onClick={() => {
          void handleCopyTextToClipBoard("phone", phone)
        }}
      >
        {phone}
      </button>
    </>
  )
}

export default EmailAndPhoneNumberBlock
