import { useEffect, useState } from "react"

export const TIME_ZONE = "America/Sao_Paulo"

const TIME_FMT = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
})

const LocalTime = () => {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setTime(TIME_FMT.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <time>{time ?? "--:--:-- --"}</time>
}

export default LocalTime
