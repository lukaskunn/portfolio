// ponytail: kept as the fallback if a settings fetch ever comes back without a timeZone.
const DEFAULT_TIME_ZONE = "America/Sao_Paulo"

const zoneOffset = (timeZone: string, at: Date) => {
  const offsetFmt = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" })
  const [, sign, h, m] = /GMT([+-])(\d\d):(\d\d)/.exec(offsetFmt.format(at)) ?? []
  return sign ? (sign === "-" ? -1 : 1) * (+h * 60 + +m) : 0
}

const hm = (min: number) => `${Math.floor(min / 60)}h${min % 60 ? String(min % 60).padStart(2, "0") : ""}`

export const offsetLabel = (timeZone: string = DEFAULT_TIME_ZONE) => {
  const now = new Date()
  const diff = -now.getTimezoneOffset() - zoneOffset(timeZone, now)
  return diff === 0 ? "we're in the same timezone" : `you are ${hm(Math.abs(diff))} ${diff > 0 ? "ahead" : "behind"}`
}
