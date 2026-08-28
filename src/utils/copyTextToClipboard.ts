// ponytail: no document.execCommand fallback for browsers without navigator.clipboard
const copyTextToClipBoard = async (text: string): Promise<boolean> => {
  if (!navigator.clipboard) return false

  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error: unknown) {
    console.error("Failed to copy text to clipboard", error)
    return false
  }
}

export default copyTextToClipBoard
