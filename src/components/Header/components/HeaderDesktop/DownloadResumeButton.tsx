'use client'
import React from 'react'
import HeaderItem from './HeaderItem';

interface DownloadResumeButtonProps {
  data: any;
}

const DownloadResumeButton = ({ data }: DownloadResumeButtonProps) => {
  return (
    <HeaderItem link={data.url} title={data.text} />
  )
}

export default DownloadResumeButton
