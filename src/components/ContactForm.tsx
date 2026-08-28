"use client"

import { useActionState, useId, useState } from "react"
import { submitContact } from "@/app/actions"
import { useLocale } from "@/hooks/useLocale"
import EmailAndPhoneNumberBlock from "./EmailAndPhoneNumberBlock"
import ContactSubmitBlock from "./ContactSubmitBlock"
import type { ContactMessages } from "@/utils/contactForm"
import type { ContactInfo } from "@/types/content"
import style from "@/styles/components/ContactForm.module.scss"

export interface ContactFormProps {
  messages: ContactMessages
  contactInfo: ContactInfo
}

const ContactForm = ({ messages, contactInfo }: ContactFormProps) => {
  const [state, formAction] = useActionState(submitContact, { status: "idle" as const })
  const uid = useId()
  const [showOptional, setShowOptional] = useState(false)
  const lang = useLocale()

  const optionalId = `${uid}-optional`
  const optionalSuffix = (required: boolean) =>
    required ? "" : ` ${messages.optionalSuffixLabel ?? ""}`

  return (
    <section className={style.section}>
      <p className={style.eyebrow}>{messages.eyebrowLabel}</p>
      <form action={formAction}>
        <input type="hidden" name="lang" value={lang} />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className={style.honeypot}
        />

        <div className={style.row}>
          <div className={style.left}>
            <div className={style.titleBlock}>
              <h2 className={style.title}>
                <span className={style.titleMuted}>{messages.titleMuted}</span>
                <span>{messages.title}</span>
              </h2>
              <div className={style.info}>
                <EmailAndPhoneNumberBlock info={contactInfo} />
              </div>
            </div>

            <ContactSubmitBlock state={state} variant="desktop" messages={messages} />
          </div>

          <div className={style.fields}>
            <div className={style.field}>
              <label htmlFor={`${uid}-name`} className={style.label}>
                {messages.name.label}
                {messages.name.required && (
                  <span aria-hidden="true" className={style.required}>*</span>
                )}
              </label>
              <input
                id={`${uid}-name`}
                name="name"
                type="text"
                defaultValue={state.values?.name}
                required={messages.name.required}
                aria-required={messages.name.required}
                autoComplete="name"
                className={style.input}
                aria-invalid={!!state.fieldErrors?.name}
                aria-describedby={state.fieldErrors?.name ? `${uid}-name-error` : undefined}
              />
              {state.fieldErrors?.name && (
                <p className={style.error} id={`${uid}-name-error`}>
                  {state.fieldErrors.name}
                </p>
              )}
            </div>

            <div
              id={optionalId}
              className={showOptional ? `${style.optional} ${style.open}` : style.optional}
            >
              <div className={style.optionalInner}>
                <div className={style.field}>
                  <label htmlFor={`${uid}-businessName`} className={style.label}>
                    {messages.businessName.label}
                    {optionalSuffix(messages.businessName.required)}
                  </label>
                  <input
                    id={`${uid}-businessName`}
                    name="businessName"
                    type="text"
                    defaultValue={state.values?.businessName}
                    required={messages.businessName.required}
                    aria-required={messages.businessName.required}
                    autoComplete="organization"
                    className={style.input}
                    aria-invalid={!!state.fieldErrors?.businessName}
                    aria-describedby={
                      state.fieldErrors?.businessName ? `${uid}-businessName-error` : undefined
                    }
                  />
                  {state.fieldErrors?.businessName && (
                    <p className={style.error} id={`${uid}-businessName-error`}>
                      {state.fieldErrors.businessName}
                    </p>
                  )}
                </div>

                <div className={style.field}>
                  <label htmlFor={`${uid}-phone`} className={style.label}>
                    {messages.phone.label}
                    {optionalSuffix(messages.phone.required)}
                  </label>
                  <input
                    id={`${uid}-phone`}
                    name="phone"
                    type="tel"
                    defaultValue={state.values?.phone}
                    required={messages.phone.required}
                    aria-required={messages.phone.required}
                    autoComplete="tel"
                    className={style.input}
                    aria-invalid={!!state.fieldErrors?.phone}
                    aria-describedby={state.fieldErrors?.phone ? `${uid}-phone-error` : undefined}
                  />
                  {state.fieldErrors?.phone && (
                    <p className={style.error} id={`${uid}-phone-error`}>
                      {state.fieldErrors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className={style.field}>
              <label htmlFor={`${uid}-email`} className={style.label}>
                {messages.email.label}
                {messages.email.required && (
                  <span aria-hidden="true" className={style.required}>*</span>
                )}
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                defaultValue={state.values?.email}
                required={messages.email.required}
                aria-required={messages.email.required}
                autoComplete="email"
                className={style.input}
                aria-invalid={!!state.fieldErrors?.email}
                aria-describedby={state.fieldErrors?.email ? `${uid}-email-error` : undefined}
              />
              {state.fieldErrors?.email && (
                <p className={style.error} id={`${uid}-email-error`}>
                  {state.fieldErrors.email}
                </p>
              )}
            </div>

            <div className={style.field}>
              <label htmlFor={`${uid}-message`} className={style.label}>
                {messages.message.label}
                {messages.message.required && (
                  <span aria-hidden="true" className={style.required}>*</span>
                )}
              </label>
              <textarea
                id={`${uid}-message`}
                name="message"
                defaultValue={state.values?.message}
                required={messages.message.required}
                aria-required={messages.message.required}
                className={style.textarea}
                aria-invalid={!!state.fieldErrors?.message}
                aria-describedby={state.fieldErrors?.message ? `${uid}-message-error` : undefined}
              />
              {state.fieldErrors?.message && (
                <p className={style.error} id={`${uid}-message-error`}>
                  {state.fieldErrors.message}
                </p>
              )}
            </div>

            <button
              type="button"
              className={style.optionalToggle}
              aria-expanded={showOptional}
              aria-controls={optionalId}
              onClick={() => setShowOptional((value) => !value)}
            >
              {messages.addOptionalLabel}
            </button>
          </div>
          <ContactSubmitBlock state={state} variant="mobile" messages={messages} />
        </div>
      </form>
    </section>
  )
}

export default ContactForm
