"use client"

import { usePathname } from "next/navigation"
import { langFromPathname, type Lang } from "@/utils/locale"

/** Active locale for client components — derived from the URL, no context. */
export const useLocale = (): Lang => langFromPathname(usePathname())
