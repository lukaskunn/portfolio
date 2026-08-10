import type { ReactNode } from "react"

import style from "@/styles/components/CursorFollower.module.scss"

type Props = {
  message: string
  children: ReactNode
}

const CursorPopup = ({ message, children }: Props) => (
  <span className={style.trigger} data-cursor-popup={message}>
    {children}
  </span>
)

export default CursorPopup
