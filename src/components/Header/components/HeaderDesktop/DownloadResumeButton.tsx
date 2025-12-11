'use client'
import React from 'react'
import HeaderItem from './HeaderItem';
import { useLanguage } from '@/contexts/LanguageContext';

const DownloadResumeButton = () => {
  const { currentContent } = useLanguage();
  const { header } = currentContent;

  return (
    <HeaderItem link={header.resumeButton.link} title={header.resumeButton.title} />
  )
}

export default DownloadResumeButton
