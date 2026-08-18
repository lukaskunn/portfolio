"use client"
import { useSyncExternalStore } from "react"
import LocalTime from "./LocalTime"
import { offsetLabel } from "@/utils/timezone"
import style from '@/styles/components/FooterLocationBlock.module.scss'

const COORDINATES = `23°33′24.59″ S / 46°39′13.79″ W`

const subscribe = () => () => {}

const FooterLocationBlock = () => {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)

  return (
    <div className={style.location} data-cursor-popup={mounted ? offsetLabel() : undefined} data-reveal-group>
      <span className={style.coords}>{COORDINATES}</span>
      <span>Remote from São Paulo / <LocalTime /></span>
    </div>
  )
}

export default FooterLocationBlock
