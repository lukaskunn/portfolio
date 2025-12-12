'use client';

import React, { useState, FormEvent } from 'react';
import styles from '@/styles/css/contact.module.css';
import { FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from '@/contexts/LanguageContext';


interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const { currentContent } = useLanguage();
  const { contact } = currentContent;
  const formContent = contact.form;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = formContent.validation.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = formContent.validation.emailRequired;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = formContent.validation.emailInvalid;
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = formContent.validation.messageRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(data.message || formContent.successMessage);
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || formContent.errorMessage);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
      setStatusMessage(formContent.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.formLabel}>
          {formContent.nameLabel}<span className={styles.required}>{formContent.requiredMark}</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`}
          value={formData.name}
          onChange={handleInputChange}
          placeholder=""
        />
        {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.formLabel}>
          {formContent.phoneLabel}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className={styles.formInput}
          value={formData.phone}
          onChange={handleInputChange}
          placeholder=""
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.formLabel}>
          {formContent.emailLabel}<span className={styles.required}>{formContent.requiredMark}</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
          value={formData.email}
          onChange={handleInputChange}
          placeholder=""
        />
        {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.formLabel}>
          {formContent.messageLabel}<span className={styles.required}>{formContent.requiredMark}</span>
        </label>
        <textarea
          id="message"
          name="message"
          className={`${styles.formTextarea} ${errors.message ? styles.inputError : ''}`}
          value={formData.message}
          onChange={handleInputChange}
          placeholder=""
          rows={3}
        />
        {errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? formContent.submittingButton : formContent.submitButton}
        <FiArrowUpRight className={styles.submitArrow} size={20} />
      </button>

      {submitStatus !== 'idle' && (
        <div
          className={`${styles.statusMessage} ${submitStatus === 'success' ? styles.successMessage : styles.errorStatus
            }`}
        >
          {statusMessage}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
