"use client"

import { useRef } from "react"

import { useCursorFollower } from "@/hooks/useCursorFollower"
import style from "@/styles/components/CursorFollower.module.scss"

const CursorFollower = () => {
  const dotRef = useRef<HTMLSpanElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  useCursorFollower(dotRef, pillRef, labelRef)

  return (
    <>
      <span ref={dotRef} className={style.dot} aria-hidden="true" />
      <div ref={pillRef} className={style.pill} aria-hidden="true">
        <span ref={labelRef} className={style.label} />
      </div>
    </>
  )
}

export default CursorFollower
