"use client"
import { useSyncExternalStore } from "react"
import LocalTime, { TIME_ZONE } from "./LocalTime"
import style from '@/styles/components/Footer.module.scss'

const COORDINATES = `23°33′24.59″ S / 46°39′13.79″ W`

const OFFSET_FMT = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, timeZoneName: "longOffset" })

const zoneOffset = (at: Date) => {
  const [, sign, h, m] = /GMT([+-])(\d\d):(\d\d)/.exec(OFFSET_FMT.format(at)) ?? []
  return sign ? (sign === "-" ? -1 : 1) * (+h * 60 + +m) : 0
}

const hm = (min: number) => `${Math.floor(min / 60)}h${min % 60 ? String(min % 60).padStart(2, "0") : ""}`

const offsetLabel = () => {
  const now = new Date()
  const diff = -now.getTimezoneOffset() - zoneOffset(now)
  return diff === 0 ? "we're in the same timezone" : `you are ${hm(Math.abs(diff))} ${diff > 0 ? "ahead" : "behind"}`
}

const subscribe = () => () => {}

const FooterLocationBlock = () => {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)

  return (
    <div data-cursor-popup={mounted ? offsetLabel() : undefined} style={{ display: "flex", flexDirection: "column" }}>
      <span className={`${style.muted} ${style.coords}`}>{COORDINATES}</span>
      <span>Remote from São Paulo / <LocalTime /></span>
    </div>
  )
}

export default FooterLocationBlock
