"use client"

import { useRef } from "react"

import { useCursorFollower } from "@/hooks/useCursorFollower"
import style from "@/styles/components/CursorFollower.module.scss"

const CursorFollower = () => {
  const ref = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  useCursorFollower(ref, popupRef)

  return (
    <>
      <div ref={ref} className={style.cursor} aria-hidden="true" />
      <div ref={popupRef} className={style.popup} aria-hidden="true" />
    </>
  )
}

export default CursorFollower
