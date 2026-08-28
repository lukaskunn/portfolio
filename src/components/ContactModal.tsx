"use client"

import { useEffect, useRef } from "react"
import { FaXmark } from "react-icons/fa6"
import ContactForm from "@/components/ContactForm"
import type { ContactMessages } from "@/utils/contactForm"
import type { Settings } from "@/types/content"
import style from "@/styles/components/ContactModal.module.scss"

export interface ContactModalProps {
  open: boolean
  onClose: () => void
  settings: Settings
  messages: ContactMessages
}

const ContactModal = ({ open, onClose, settings, messages }: ContactModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className={style.dialog}
      aria-label={settings.contactModalLabel}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
    >
      <div className={style.inner}>
        <button
          type="button"
          className={style.close}
          aria-label={settings.closeContactFormLabel}
          autoFocus
          onClick={onClose}
        >
          <FaXmark size={16} aria-hidden="true" focusable="false" />
        </button>
        <ContactForm
          messages={messages}
          contactInfo={{
            email: settings.email,
            phone: settings.phone,
            copyEmailLabel: settings.copyEmailLabel,
            emailCopiedLabel: settings.emailCopiedLabel,
            copyPhoneLabel: settings.copyPhoneLabel,
            phoneCopiedLabel: settings.phoneCopiedLabel,
          }}
        />
      </div>
    </dialog>
  )
}

export default ContactModal
