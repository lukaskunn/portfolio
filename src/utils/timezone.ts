import { TIME_ZONE } from "@/utils/contants"

const OFFSET_FMT = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, timeZoneName: "longOffset" })

const zoneOffset = (at: Date) => {
  const [, sign, h, m] = /GMT([+-])(\d\d):(\d\d)/.exec(OFFSET_FMT.format(at)) ?? []
  return sign ? (sign === "-" ? -1 : 1) * (+h * 60 + +m) : 0
}

const hm = (min: number) => `${Math.floor(min / 60)}h${min % 60 ? String(min % 60).padStart(2, "0") : ""}`

export const offsetLabel = () => {
  const now = new Date()
  const diff = -now.getTimezoneOffset() - zoneOffset(now)
  return diff === 0 ? "we're in the same timezone" : `you are ${hm(Math.abs(diff))} ${diff > 0 ? "ahead" : "behind"}`
}
