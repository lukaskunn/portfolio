"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import ContactModal from "@/components/ContactModal"
import type { ContactMessages } from "@/utils/contactForm"
import type { Settings } from "@/types/content"

const ContactModalContext = createContext<(() => void) | null>(null)

export interface ContactModalProviderProps {
  children: ReactNode
  settings: Settings
  messages: ContactMessages
}

export const ContactModalProvider = ({ children, settings, messages }: ContactModalProviderProps) => {
  const [open, setOpen] = useState(false)
  const openContactModal = useCallback(() => setOpen(true), [])
  const closeContactModal = useCallback(() => setOpen(false), [])

  return (
    <ContactModalContext.Provider value={openContactModal}>
      {children}
      <ContactModal
        open={open}
        onClose={closeContactModal}
        settings={settings}
        messages={messages}
      />
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
