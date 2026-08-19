import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react"

export interface RichTextProps {
  value: PortableTextBlock[]
  highlightClass?: string
}

const RichText = ({ value, highlightClass }: RichTextProps) => {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p data-reveal="lines">{children}</p>,
    },
    marks: {
      highlight: ({ children }) => <span className={highlightClass}>{children}</span>,
    },
  }

  return <PortableText value={value} components={components} />
}

export default RichText
