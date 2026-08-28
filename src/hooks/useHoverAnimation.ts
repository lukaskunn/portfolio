import type { RefObject } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export const useHoverAnimation = (
  scope: RefObject<HTMLElement | null>,
  selector: string,
  makeTween: (el: HTMLElement) => gsap.core.Tween | gsap.core.Timeline | null | undefined,
  options?: { resetOnLeave?: boolean }
) => {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const cleanups = gsap.utils
          .toArray<HTMLElement>(selector, scope.current)
          .flatMap((el) => {
            const tween = makeTween(el)
            if (!tween) return []

            const enter = () => {
              tween.invalidate()
              tween.play()
            }
            const leave = options?.resetOnLeave ? () => tween.pause(0) : () => tween.reverse()
            el.addEventListener("mouseenter", enter)
            el.addEventListener("mouseleave", leave)

            return [
              () => {
                el.removeEventListener("mouseenter", enter)
                el.removeEventListener("mouseleave", leave)
                tween.kill()
              },
            ]
          })

        return () => cleanups.forEach((fn) => fn())
      }
    )
  }, { scope })
}
