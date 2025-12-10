goal: build a page component for project details. This page will have 3 major sections: Overview, gallery and s small footer.

The page structure and specifications will be in a json file. the json will have the following structure:

for the overview section:
- title: string
- type: string
- service: string
- industry: string
- year: string
- description: string
- mainImageUrl: string (url to the main image of the project)

the gallery section will be an array of objects with:
- type: string (this type can be text-bigimage, bigimage-text, text-smallimage, smallimage-text, image-only, text-only, smallimage-bigimage, bigimage-smallimage. Into the component it will be a grid with 3 columns and the images will be placed according to the type)

based on the type the image will be placed in different positions in the grid.

- leftImageUrl: string (optional, url to the left image of the project)
- rightImageUrl: string (optional, url to the right image of the project)
- text: string (optional)
- caption: string (optional)

for the footer section:
- linkToNextProject: string (url to the next project)

```json
{
  "overview": {
    "title": "Project Title",
    "type": "Web Application",
    "service": "Web Development",
    "industry": "Technology",
    "year": "2024",
    "description": "A brief description of the project highlighting its main features and objectives.",
    "mainImageUrl": "/images/project-main.png"
  },
  "gallery": [
    {
      "type": "text-bigimage",
      "text": "This is a detailed explanation of the project with a big image on the right.",
      "rightImageUrl": "/images/project-image1.png",
      "caption": "Caption for the first image"
    },
    {
      "type": "bigimage-text",
      "leftImageUrl": "/images/project-image2.png",
      "text": "Another section with a big image on the left and text on the right.",
      "caption": "Caption for the second image"
    },
    {
      "type": "image-only",
      "leftImageUrl": "/images/project-image3.png",
      "caption": "Caption for the third image"
    }
  ],
  "footer": {
    "linkToNextProject": "/project/next-project"
  }
}
```

make the project page component in React using the above json structure. The component should be split into smaller subcomponents for each section (Overview, Gallery, Footer) and each subcomponent should receive the relevant data as props. The scss styling should be modular and scoped to each component.
