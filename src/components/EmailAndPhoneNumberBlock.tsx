'use client'
import { useState, useRef, useEffect } from "react"
import { EMAIL, PHONE } from "@/utils/contants"
import copyTextToClipBoard from "@/utils/copyTextToClipboard"
import style from "@/styles/components/EmailAndPhoneNumberBlock.module.scss"

const EmailAndPhoneNumberBlock = () => {
  const [copied, setCopied] = useState<"email" | "phone" | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

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
        data-cursor-popup={copied === "email" ? "Email copied to clipboard" : "copy email to clipboard!"}
        aria-label={`Copy email address ${EMAIL}`}
        onClick={() => {
          void handleCopyTextToClipBoard("email", EMAIL)
        }}
      >
        {EMAIL}
      </button>
      <button
        type="button"
        className={style.copy}
        data-cursor-popup={copied === "phone" ? "Phone number copied to clipboard" : "copy phone number to clipboard!"}
        aria-label={`Copy phone number ${PHONE}`}
        onClick={() => {
          void handleCopyTextToClipBoard("phone", PHONE)
        }}
      >
        {PHONE}
      </button>
    </>
  )
}

export default EmailAndPhoneNumberBlock
