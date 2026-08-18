"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(SplitText)

// Above-the-fold reveals wait out the page transition running over them
// (globals.scss: 1000ms cover, 560ms reveal-exit). try/catch because
// :active-view-transition-type() throws SyntaxError in browsers without it.
const INTRO_DURATION = 6.6

const entranceDelay = () => {
  try {
    const el = document.documentElement
    if (el.dataset.intro === "playing") return INTRO_DURATION
    if (el.matches(":active-view-transition-type(nav-reveal)")) return 0.34
    if (el.matches(":active-view-transition")) return 0.55
  } catch {
    return 0.12
  }
  return 0.12
}

export const useRevealOnScroll = () => {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    const motionOk = matchMedia("(prefers-reduced-motion: no-preference)").matches
    const splits = new Map<Element, SplitText>()
    const delay = motionOk ? entranceDelay() : 0

    let entrance = delay

    if (motionOk) {
      root.style.setProperty("--reveal-delay", `${delay}s`)
      // Only the first, already-in-view batch waits for the page transition.
      window.setTimeout(() => (entrance = 0), delay * 1000 + 50)

      document.querySelectorAll<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
        const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "revealLine" })
        split.lines.forEach((line, i) => (line as HTMLElement).style.setProperty("--reveal-i", String(i)))
        // Read by .scrollCue on /services so its delay tracks the title's
        // actual wrap count instead of a hardcoded line-count assumption.
        const scope = el.closest<HTMLElement>("[data-section]") ?? el
        scope.style.setProperty("--reveal-lines", String(split.lines.length))
        splits.set(el, split)
      })
    }

    document.querySelectorAll('[data-reveal-group], [data-reveal="rise"], [data-reveal="spread"]').forEach((group) =>
      Array.from(group.children).forEach((child, i) =>
        (child as HTMLElement).style.setProperty("--reveal-i", String(i))
      )
    )

    // Written per element, not mutated on :root: changing --reveal-delay while
    // an animation sits in its delay phase retimes that animation, which made
    // the first batch skip most of its entrance on route changes.
    const reveal = (el: Element) => {
      if (motionOk) (el as HTMLElement).style.setProperty("--reveal-delay", `${entrance}s`)
      el.setAttribute("data-reveal-in", "")
    }

    // Split lines are block-level, so a resize would freeze the wrapping and
    // overflow the mask. Reverting on a timer instead re-wraps the text mid-
    // view and shifts any container sized off its content, so wait for the
    // resize that is the actual hazard.
    const onResize = () => {
      splits.forEach((split) => split.revert())
      splits.clear()
    }

    window.addEventListener("resize", onResize)

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          reveal(entry.target)
          io.unobserve(entry.target)
        })
      },
      { rootMargin: "0px 0px -12% 0px" }
    )

    document
      .querySelectorAll('[data-reveal]:not([data-reveal-now]), [data-reveal-group]:not([data-reveal-now])')
      .forEach((el) => io.observe(el))

    // Above-the-fold / non-scrolling content never intersects the observer's
    // shrunk root, so reveal it immediately instead of waiting on IO.
    let rafId = 0
    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        // Flat delay, written by reveal() — ordering is owned entirely by each
        // page's own --reveal-step queue (about.module.scss /
        // project.module.scss), not by document order, which would double the
        // stagger.
        document.querySelectorAll<HTMLElement>("[data-reveal-now]").forEach(reveal)
      })
    })

    return () => {
      cancelAnimationFrame(rafId)
      io.disconnect()
      window.removeEventListener("resize", onResize)
      splits.forEach((split) => split.revert())
    }
  }, [pathname])
}
