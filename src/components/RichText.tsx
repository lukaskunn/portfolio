import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react"

export interface RichTextProps {
  value: PortableTextBlock[]
  highlightClass?: string
  paragraphClass?: string
  revealNow?: boolean
  reveal?: boolean
}

const RichText = ({ value, highlightClass, paragraphClass, revealNow, reveal = true }: RichTextProps) => {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p
          className={paragraphClass}
          data-reveal={reveal ? "lines" : undefined}
          data-reveal-now={reveal && revealNow ? true : undefined}
        >
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
