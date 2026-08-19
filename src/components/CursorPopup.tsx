import type { ReactNode } from "react"

import style from "@/styles/components/CursorPopup.module.scss"

export interface CursorPopupProps {
  message: string
  children: ReactNode
}

const CursorPopup = ({ message, children }: CursorPopupProps) => (
  <span className={style.trigger} data-cursor-popup={message}>
    {children}
  </span>
)

export default CursorPopup
