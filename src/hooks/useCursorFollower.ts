import type { RefObject } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { useMousePosition } from "@/hooks/useMousePosition"

export const useCursorFollower = (ref: RefObject<HTMLDivElement | null>, popupRef: RefObject<HTMLDivElement | null>) => {
  const mouse = useMousePosition()

  useGSAP(() => {
    const el = ref.current
    const popup = popupRef.current
    if (!el || !popup) return

    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 })

    const mm = gsap.matchMedia()

    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" })
      const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" })

      gsap.set(popup, { xPercent: 0, yPercent: 0, autoAlpha: 0 })
      const px = gsap.quickTo(popup, "x", { duration: 0.1, ease: "power3" })
      const py = gsap.quickTo(popup, "y", { duration: 0.1, ease: "power3" })

      // ponytail: no scroll listener — el is position:fixed and tracks
      // clientX/clientY, so scrolling with a stationary mouse correctly
      // leaves the circle where the real cursor is.
      let revealed = false

      let trigger: HTMLElement | null = null
      let w = 0
      let h = 0
      // ponytail: corner latched on show, never re-evaluated — a chip shown
      // mid-screen and dragged to an edge will overflow. Recompute in the ticker
      // with a dead-band if that becomes visible.
      let fx = false
      let fy = false
      // ponytail: GAP is the calibration knob for chip distance from cursor
      const GAP = 20
      const MARGIN = 12

      const measure = () => {
        w = popup.offsetWidth
        h = popup.offsetHeight
      }

      const hide = () => {
        trigger = null
        gsap.to(popup, { autoAlpha: 0, duration: 0.15, overwrite: "auto" })
      }

      const onOver = (e: PointerEvent) => {
        const next = (e.target as Element | null)?.closest?.<HTMLElement>("[data-cursor-popup]") ?? null
        if (next === trigger) return
        trigger = next
        if (!trigger) return hide()

        popup.textContent = trigger.dataset.cursorPopup ?? ""
        measure()
        fx = e.clientX + GAP + w > window.innerWidth - MARGIN
        fy = e.clientY + GAP + h > window.innerHeight - MARGIN
        gsap.to(popup, { autoAlpha: 1, duration: 0.2, overwrite: "auto", delay: 0.1 })
      }

      document.addEventListener("pointerover", onOver)
      document.addEventListener("pointerleave", hide)
      window.addEventListener("resize", measure)

      const render = () => {
        if (!mouse.current) return
        const { x: mx, y: my } = mouse.current

        x(mx)
        y(my)

        if (!revealed) {
          revealed = true
          gsap.to(el, { autoAlpha: 1, duration: 0.2 })
        }

        if (trigger && !trigger.isConnected) hide()

        px(fx ? mx - GAP - w : mx + GAP)
        py(fy ? my - GAP - h : my + GAP)
      }

      gsap.ticker.add(render)

      return () => {
        gsap.ticker.remove(render)
        document.removeEventListener("pointerover", onOver)
        document.removeEventListener("pointerleave", hide)
        window.removeEventListener("resize", measure)
      }
    })

    return () => mm.revert()
  }, [])
}
