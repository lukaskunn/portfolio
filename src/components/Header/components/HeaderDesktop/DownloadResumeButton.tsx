'use client'
import React from 'react'
import HeaderItem from './HeaderItem';

import type { DownloadResumeButtonProps } from '@/types';

const DownloadResumeButton = ({ data }: DownloadResumeButtonProps) => {
  return (
    <HeaderItem link={data.url} title={data.text} />
  )
}

export default React.memo(DownloadResumeButton)
