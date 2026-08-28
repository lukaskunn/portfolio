import { useEffect, useRef } from "react"

export type MousePosition = { x: number; y: number }

export const useMousePosition = () => {
  const position = useRef<MousePosition | null>(null)

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      position.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("pointermove", handleMove)

    return () => window.removeEventListener("pointermove", handleMove)
  }, [])

  return position
}
