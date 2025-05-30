export type LocalizedProjects = Record<LanguageKey, Project | undefined>;

interface GalleryImage {
  front: string;
  back: string;
  photoText: string;
}

export interface Project {
  projectId: string;
  title: string;
  description: string;
  briefDescription?: string;
  urlToProject: string;
  galleryBackground: string;
  galleryBackgroundColor: string;
  technologies?: string[];
  galleryImages?: GalleryImage[][];
  goToExternalPage?: boolean;
}

type LanguageKey = 'en' | 'pt';