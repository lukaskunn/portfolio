"use client"

import { ViewTransition } from "react"
import { usePathname } from "next/navigation"

// ponytail: this sentinel renders nothing visible — its only job is to make
// React call startViewTransition on every route, so the `root` snapshot can be
// animated in globals.scss. It is keyed on the pathname because React's
// `update` path only participates when an element's bounding rect changes; a
// remount goes through enter/exit, which always participates.
const RouteTransition = () => {
  const pathname = usePathname()

  return (
    <ViewTransition key={pathname} default="route-tick">
      <span
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    </ViewTransition>
  )
}

export default RouteTransition
