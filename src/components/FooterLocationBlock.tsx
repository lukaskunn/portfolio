"use client"
import { useSyncExternalStore } from "react"
import LocalTime from "./LocalTime"
import { offsetLabel } from "@/utils/timezone"
import style from '@/styles/components/FooterLocationBlock.module.scss'

export interface FooterLocationBlockProps {
  latitude?: number
  longitude?: number
  remoteFromLabel?: string
  timeZone: string
}

const subscribe = () => () => {}

const dms = (value: number, positive: string, negative: string) => {
  const abs = Math.abs(value)
  const deg = Math.floor(abs)
  const minFloat = (abs - deg) * 60
  const min = Math.floor(minFloat)
  const sec = ((minFloat - min) * 60).toFixed(2)
  return `${deg}°${min}′${sec}″ ${value >= 0 ? positive : negative}`
}

const FooterLocationBlock = ({ latitude, longitude, remoteFromLabel, timeZone }: FooterLocationBlockProps) => {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  const coords =
    latitude != null && longitude != null
      ? `${dms(latitude, "N", "S")} / ${dms(longitude, "E", "W")}`
      : ""

  return (
    <div className={style.location} data-cursor-popup={mounted ? offsetLabel(timeZone) : undefined} data-reveal-group>
      <span className={style.coords}>{coords}</span>
      <span>{remoteFromLabel ?? ""} <LocalTime timeZone={timeZone} /></span>
    </div>
  )
}

export default FooterLocationBlock
