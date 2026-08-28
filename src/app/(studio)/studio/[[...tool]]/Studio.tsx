"use client"

import { NextStudio } from "next-sanity/studio"
import config from "../../../../../sanity.config"

// "use client" keeps sanity.config (and all of `sanity`) out of the RSC graph —
// under the react-server condition `swr` has no default export and the build
// fails. The page next to this file stays a server component for its metadata.
export default function Studio() {
  return <NextStudio config={config} />
}
