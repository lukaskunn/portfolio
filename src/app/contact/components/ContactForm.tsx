'use client';

import React, { useState, FormEvent } from 'react';
import styles from '@/styles/css/contact.module.css';
import { FiArrowUpRight } from "react-icons/fi";


interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  // budget: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// const budgetOptions = ['5K-10K', '10K-20K', 'MORE'];

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
    // budget: '5K-10K',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
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

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // const handleBudgetSelect = (budget: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     budget,
  //   }));
  // };

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
        setStatusMessage(data.message || 'Message sent successfully!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
          // budget: '5K-10K',
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
      setStatusMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.formLabel}>
          YOUR NAME<span className={styles.required}>*</span>
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
          PHONE
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
          YOUR EMAIL<span className={styles.required}>*</span>
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
          HOW CAN I HELP YOU<span className={styles.required}>*</span>
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

      {/* <div className={styles.formGroup}>
        <label className={styles.formLabel}>PROJECT BUDGET (USD)</label>
        <div className={styles.budgetOptions}>
          {budgetOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`${styles.budgetOption} ${formData.budget === option ? styles.budgetSelected : ''
                }`}
              onClick={() => handleBudgetSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div> */}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'SENDING...' : 'DISCUSS THE PROJECT'}
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
