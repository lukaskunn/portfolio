import { useEffect, useState } from "react"

export interface LocalTimeProps {
  timeZone: string
}

const LocalTime = ({ timeZone }: LocalTimeProps) => {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [timeZone])

  return <time>{time ?? "--:--:-- --"}</time>
}

export default LocalTime
