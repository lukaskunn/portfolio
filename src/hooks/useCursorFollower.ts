import type { RefObject } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { useMousePosition } from "@/hooks/useMousePosition"

// GSAP approximation of the $ease-out CSS token (matching EXIT_EASE in Loader.tsx)
const MORPH_EASE = "power4.out"

export const useCursorFollower = (
  dotRef: RefObject<HTMLSpanElement | null>,
  pillRef: RefObject<HTMLDivElement | null>,
  labelRef: RefObject<HTMLSpanElement | null>
) => {
  const mouse = useMousePosition()

  useGSAP(() => {
    const dot = dotRef.current
    const pill = pillRef.current
    const label = labelRef.current
    if (!dot || !pill || !label) return

    gsap.set([dot, pill], { xPercent: -50, yPercent: -50, autoAlpha: 0 })

    const mm = gsap.matchMedia()

    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const x = gsap.quickTo([dot, pill], "x", { duration: 0.35, ease: "power3" })
      const y = gsap.quickTo([dot, pill], "y", { duration: 0.35, ease: "power3" })

      const base = dot.offsetWidth
      gsap.set([dot, pill], { borderRadius: base / 2 })

      let revealed = false
      let trigger: HTMLElement | null = null
      let morph: gsap.core.Timeline | null = null
      let open = false
      let current = ""

      const measure = (text: string) => {
        const prevText = label.textContent
        const prevWidth = pill.style.width
        const prevHeight = pill.style.height

        label.textContent = text
        pill.style.width = "auto"
        pill.style.height = "auto"
        const w = pill.offsetWidth
        const h = pill.offsetHeight

        label.textContent = prevText
        pill.style.width = prevWidth
        pill.style.height = prevHeight

        return { w, h }
      }

      const show = (text: string) => {
        const { w, h } = measure(text)
        morph?.kill()
        gsap.killTweensOf([dot, pill], "width,height,borderRadius,opacity,visibility")
        gsap.killTweensOf(label)

        const tl = gsap.timeline()
        tl.to(pill, { autoAlpha: 1, duration: 0.2, ease: "none" }, 0)
        tl.set(dot, { autoAlpha: 0 }, 0.2)
        if (!open) {
          label.textContent = text
          tl.to([dot, pill], { width: w, height: h, borderRadius: 8, duration: 0.2, ease: MORPH_EASE }, 0)
          tl.to(label, { autoAlpha: 1, duration: 0.2, ease: "none" }, 0.2)
        } else {
          tl.to(label, { autoAlpha: 0, duration: 0.1, ease: "none" }, 0)
          tl.add(() => {
            label.textContent = text
          }, 0.1)
          tl.to([dot, pill], { width: w, height: h, borderRadius: 8, duration: 0.2, ease: MORPH_EASE }, 0)
          tl.to(label, { autoAlpha: 1, duration: 0.1, ease: "none" }, 0.2)
        }
        morph = tl

        current = text
        open = true
      }

      const hide = () => {
        trigger = null
        // killing the timeline (not just overwrite) is what stops a quick
        // hover-in/out from re-fading the label from inside its delay
        morph?.kill()
        gsap.killTweensOf([dot, pill], "width,height,borderRadius,opacity,visibility")
        gsap.killTweensOf(label)

        const tl = gsap.timeline()
        tl.set(dot, { autoAlpha: 1 }, 0)
        tl.to(label, { autoAlpha: 0, duration: 0.1, ease: "none" }, 0)
        tl.to(pill, { autoAlpha: 0, duration: 0.2, ease: "none" }, 0.05)
        tl.to([dot, pill], { width: base, height: base, borderRadius: base / 2, duration: 0.3, ease: MORPH_EASE }, 0.05)
        morph = tl

        open = false
        current = ""
      }

      const onOver = (e: PointerEvent) => {
        const next = (e.target as Element | null)?.closest?.<HTMLElement>("[data-cursor-popup]") ?? null
        if (next === trigger) return
        trigger = next
        if (!trigger) return hide()

        show(trigger.dataset.cursorPopup ?? "")
      }

      document.addEventListener("pointerover", onOver)
      document.addEventListener("pointerleave", hide)

      const render = () => {
        if (!mouse.current) return
        const { x: mx, y: my } = mouse.current

        x(mx)
        y(my)

        if (!revealed) {
          revealed = true
          gsap.to(dot, { autoAlpha: 1, duration: 0.2 })
        }

        if (trigger && !trigger.isConnected) hide()

        // compare against `current`, not label.textContent — during the warm
        // crossfade the DOM text stays stale for 100ms, so comparing against
        // label.textContent would restart the timeline every frame
        if (trigger && trigger.dataset.cursorPopup !== current) show(trigger.dataset.cursorPopup ?? "")
      }

      gsap.ticker.add(render)

      return () => {
        gsap.ticker.remove(render)
        document.removeEventListener("pointerover", onOver)
        document.removeEventListener("pointerleave", hide)
      }
    })

    return () => mm.revert()
  }, [])
}

// ponytail: viewport-edge clamping was deliberately dropped with the old
// fx/fy corner flip — add a gsap.utils.clamp in the ticker if a wide pill
// visibly bleeds off-screen
