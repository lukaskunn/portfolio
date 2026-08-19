"use client"

import { useActionState, useId, useState } from "react"
import { submitContact } from "@/app/actions"
import { useLocale } from "@/hooks/useLocale"
import EmailAndPhoneNumberBlock from "./EmailAndPhoneNumberBlock"
import ContactSubmitBlock from "./ContactSubmitBlock"
import style from "@/styles/components/ContactForm.module.scss"

const ContactForm = () => {
  const [state, formAction] = useActionState(submitContact, { status: "idle" as const })
  const uid = useId()
  const [showOptional, setShowOptional] = useState(false)
  const lang = useLocale()




  const optionalId = `${uid}-optional`

  return (
    <section className={style.section}>
      <p className={style.eyebrow}>Contact</p>
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
                <span className={style.titleMuted}>Any idea in mind?</span>
                <span>Lets create together</span>
              </h2>
              <div className={style.info}>
                <EmailAndPhoneNumberBlock />
              </div>
            </div>

            <ContactSubmitBlock state={state} variant="desktop" />
          </div>

          <div className={style.fields}>
            <div className={style.field}>
              <label htmlFor={`${uid}-name`} className={style.label}>
                your name <span aria-hidden="true" className={style.required}>*</span>
              </label>
              <input
                id={`${uid}-name`}
                name="name"
                type="text"
                defaultValue={state.values?.name}
                required
                aria-required="true"
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
                    your business name (optional)
                  </label>
                  <input
                    id={`${uid}-businessName`}
                    name="businessName"
                    type="text"
                    defaultValue={state.values?.businessName}
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
                    your phone number (optional)
                  </label>
                  <input
                    id={`${uid}-phone`}
                    name="phone"
                    type="tel"
                    defaultValue={state.values?.phone}
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
                your email <span aria-hidden="true" className={style.required}>*</span>
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                defaultValue={state.values?.email}
                required
                aria-required="true"
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
                your project idea <span aria-hidden="true" className={style.required}>*</span>
              </label>
              <textarea
                id={`${uid}-message`}
                name="message"
                defaultValue={state.values?.message}
                required
                aria-required="true"
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
              + add business name & phone (optional)
            </button>
          </div>
          <ContactSubmitBlock state={state} variant="mobile" />
        </div>
      </form>
    </section>
  )
}

export default ContactForm
