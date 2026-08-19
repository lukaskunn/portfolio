import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react"

export interface RichTextProps {
  value: PortableTextBlock[]
  highlightClass?: string
  paragraphClass?: string
  revealNow?: boolean
}

const RichText = ({ value, highlightClass, paragraphClass, revealNow }: RichTextProps) => {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className={paragraphClass} data-reveal="lines" data-reveal-now={revealNow ? true : undefined}>
          {children}
        </p>
      ),
    },
    marks: {
      highlight: ({ children }) => <span className={highlightClass}>{children}</span>,
    },
  }

  return <PortableText value={value} components={components} />
}

export default RichText
