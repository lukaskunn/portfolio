import type { Lang } from "@/utils/locale"
import pt from "./dictionaries/pt.json"
import en from "./dictionaries/en.json"

export type Dictionary = typeof pt

const DICTIONARIES: Record<Lang, Dictionary> = { pt, en }

export const getDictionary = (lang: Lang): Dictionary => DICTIONARIES[lang]
