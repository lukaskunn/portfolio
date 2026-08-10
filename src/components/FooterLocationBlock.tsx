"use client"
import LocalTime from "./LocalTime"
import style from '@/styles/components/Footer.module.scss'

const COORDINATES = `23°33′24.59″ S / 46°39′13.79″ W`
const FooterLocationBlock = () => {
  return (
    <>
      <span className={`${style.muted} ${style.coords}`}>{COORDINATES}</span>
      <span>Remote from São Paulo / <LocalTime /></span>
    </>
  )
}

export default FooterLocationBlock
