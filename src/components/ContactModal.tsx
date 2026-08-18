"use client"

import { useEffect, useRef } from "react"
import { FaXmark } from "react-icons/fa6"
import ContactForm from "@/components/ContactForm"
import style from "@/styles/components/ContactModal.module.scss"

export interface ContactModalProps {
  open: boolean
  onClose: () => void
}

const ContactModal = ({ open, onClose }: ContactModalProps) => {
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
      aria-label="Contact"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
    >
      <div className={style.inner}>
        <button
          type="button"
          className={style.close}
          aria-label="Close contact form"
          autoFocus
          onClick={onClose}
        >
          <FaXmark size={16} aria-hidden="true" focusable="false" />
        </button>
        <ContactForm />
      </div>
    </dialog>
  )
}

export default ContactModal
