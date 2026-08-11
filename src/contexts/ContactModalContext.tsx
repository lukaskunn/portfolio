"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import ContactModal from "@/components/ContactModal"

const ContactModalContext = createContext<(() => void) | null>(null)

export const ContactModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const openContactModal = useCallback(() => setOpen(true), [])
  const closeContactModal = useCallback(() => setOpen(false), [])

  return (
    <ContactModalContext.Provider value={openContactModal}>
      {children}
      <ContactModal open={open} onClose={closeContactModal} />
    </ContactModalContext.Provider>
  )
}

export const useContactModal = () => {
  const openContactModal = useContext(ContactModalContext)
  if (!openContactModal) {
    throw new Error("useContactModal must be used within a ContactModalProvider")
  }
  return openContactModal
}
