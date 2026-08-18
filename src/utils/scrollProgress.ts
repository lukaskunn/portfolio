// offsetTop is relative to offsetParent, not the document — walk the
// offsetParent chain to get a true document-space top (sticky ancestors and
// positioned wrappers like .scrollOver would otherwise report ~0).
export const docTop = (el: HTMLElement) => {
  let top = 0
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop
  }
  return top
}

export const progressAt = (
  playhead: number,
  sections: { top: number; height: number }[]
): number => {
  const clamp = (value: number) => Math.min(1, Math.max(0, value))
  const progresses = sections.map(({ top, height }) =>
    height > 0 ? clamp((playhead - top) / height) : 0
  )
  const activeIndex = progresses.findIndex((p) => p < 1)
  return activeIndex === -1 ? progresses.length - 1 : activeIndex
}
