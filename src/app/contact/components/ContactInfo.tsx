'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import styles from '@/styles/css/contact.module.css';
import { FiArrowUpRight } from "react-icons/fi";
import { usePageContext } from '@/contexts/PageContext';
import { useTransitionContext } from '@/contexts/TransitionContext';

gsap.registerPlugin(SplitText);

interface ContactInfoProps {
  data: any;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ data }) => {
  const infoRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLAnchorElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const { isLoaded } = usePageContext();
  const { isPageReady } = useTransitionContext();

  useGSAP(() => {
    if (!infoRef.current || !phoneRef.current || !emailRef.current || !socialLinksRef.current) return;

    // Only set initial state if page is not ready and hasn't animated yet
    if (!isPageReady && !hasAnimatedRef.current) {
      gsap.set(infoRef.current, { opacity: 0 });
      return;
    }

    if (!isLoaded || !isPageReady) return;

    // Split phone and email into chars
    const phoneSplit = new SplitText(phoneRef.current, {
      type: 'chars',
      charsClass: 'split-char',
    });

    const emailSplit = new SplitText(emailRef.current, {
      type: 'chars',
      charsClass: 'split-char',
    });

    const socialLinks = socialLinksRef.current.querySelectorAll(`.${styles.socialLink}`);

    // Set container visible
    gsap.set(infoRef.current, { opacity: 1 });

    // Mark as animated
    hasAnimatedRef.current = true;

    const tl = gsap.timeline({ delay: 2.2 });

    // Animate phone number
    tl.fromTo(
      phoneSplit.chars,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.02
      }
    );

    // Animate email
    tl.fromTo(
      emailSplit.chars,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.015
      },
      '<0.15'
    );

    // Animate social links
    gsap.set(socialLinks, { opacity: 0, x: -20 });

    tl.to(socialLinks, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1
    }, '<0.3');

    // Cleanup function to revert split
    return () => {
      phoneSplit.revert();
      emailSplit.revert();
    };

  }, { dependencies: [isLoaded, isPageReady], scope: infoRef });

  return (
    <div ref={infoRef} className={styles.contactInfo}>
      <div className={styles.contactDetails}>
        <a
          ref={phoneRef}
          href={`tel:${data.contactInfo?.phone?.replace(/\s/g, '') || ''}`}
          className={styles.contactPhone}
          style={{ overflow: 'hidden' }}
        >
          {data.contactInfo?.phone || '+55 11 99999-9999'}
        </a>
        <a
          ref={emailRef}
          href={`mailto:${data.contactInfo?.email || ''}`}
          className={styles.contactEmail}
          style={{ overflow: 'hidden' }}
        >
          {data.contactInfo?.email || 'contact@example.com'}
        </a>
      </div>

      <div ref={socialLinksRef} className={styles.socialLinks}>
        {data.socialLinks?.map((link: any) => (
          <a
            key={link.text}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            {link.text} <FiArrowUpRight className={styles.linkArrow} size={14} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
