export interface ProjectData {
  overview: {
    title: string
    type: string
    service: string
    industry: string
    year: string
    description: string
    mainImageUrl: string
  }
  gallery: GalleryItemData[]
  footer: {
    linkToNextProject: string
  }
}

export interface GalleryItemData {
  type: 'text-bigimage' | 'bigimage-text' | 'text-smallimage' | 'smallimage-text' | 'image-only' | 'text-only' | 'smallimage-bigimage' | 'bigimage-smallimage'
  leftImageUrl?: string
  rightImageUrl?: string
  text?: string
  caption?: string
}
