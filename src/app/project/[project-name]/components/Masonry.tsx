//@ts-nocheck
import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

type MasonryContainerProps = {
  children: React.ReactNode
}

const MasonryContainer = ({ children }: MasonryContainerProps) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3 }} gutterBreakPoints={{ 1: "0px" }}>
      <Masonry>
        {children}
      </Masonry>
    </ResponsiveMasonry>
  )
}

export default MasonryContainer