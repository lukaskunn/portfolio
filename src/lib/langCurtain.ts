import style from "@/styles/components/LangCurtain.module.scss"

const ENTER = 820 // enter duration + stagger — fully covered
const HOLD = 120
const EXIT = 740 // exit duration + stagger
const FAILSAFE = 2500

let running = false

// Plain DOM, not a React component: Header lives in the [lang] layout, so the
// locale change remounts it and any React-owned curtain would vanish mid-run.
export const runLangCurtain = (push: () => void) => {
  if (running) return
  running = true

  const curtain = document.createElement("div")
  curtain.className = style.curtain
  curtain.dataset.state = "enter"
  curtain.setAttribute("aria-hidden", "true")

  for (const panel of [style.panelBack, style.panelFront]) {
    const el = document.createElement("div")
    el.className = panel
    curtain.append(el)
  }

  document.body.append(curtain)

  const origin = location.pathname
  const start = performance.now()

  const leave = () => {
    curtain.dataset.state = "exit"
    window.setTimeout(() => {
      curtain.remove()
      running = false
    }, EXIT)
  }

  window.setTimeout(() => {
    push()

    // ponytail: polls the URL because the tree that would have watched
    // usePathname is the one being remounted. One rAF read, nothing else.
    // The elapsed check doubles as the stuck-curtain failsafe.
    const watch = () => {
      if (location.pathname !== origin) return window.setTimeout(leave, HOLD)
      if (performance.now() - start > FAILSAFE) return leave()
      requestAnimationFrame(watch)
    }

    watch()
  }, ENTER)
}
