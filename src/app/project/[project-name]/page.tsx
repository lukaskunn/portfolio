import React from 'react'
import styles from "@/styles/css/project.module.css"
import Overview from './components/Overview'
import Gallery from './components/Gallery'
import ProjectFooter from './components/ProjectFooter'

// This would be fetched based on the project-name param
// For now, using mock data matching the JSON structure
const getProjectData = (projectName: string) => {
  return {
    overview: {
      title: "CASA DEXCO",
      type: "WEBSITE",
      service: "WEB DEVELOPMENT",
      industry: "HOUSE",
      year: "2025",
      descriptionLeft: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan diam leo, vel blandit purus sollicitudin in. Praesent vel aliquet risus, a tincidunt est. Donec eleifend diam et quam convallis, non rutrum eros tempus. Aliquam dictum erat ut ex egestas mattis. Maecenas commodo justo a pretium tincidunt. Donec faucibus vel dolor et maximus. Integer feugiat sagittis ex eu vulputate. Aenean sollicitudin porttitor neque eget sollicitudin. Fusce eleifend nisi eu elit vehicula, iaculis pellentesque mauris auctor. Pellentesque viverra massa ante, sit amet dapibus elit ultrices ut. Aliquam erat volutpat. Sed vulputate mi in congue pellentesque. Nam vitae augue placerat, dapibus augue nec, iaculis eros. Fusce eget interdum urna. <br /><br /> Praesent at suscipit nisi. Aliquam volutpat dolor a bibendum ullamcorper. Duis dignissim placerat auctor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec",
      descriptionRight: "Nunc fringilla, velit ac bibendum ultricies, magna erat eleifend sem, ut fermentum libero augue ac ex. Integer at ligula elementum lectus laoreet sagittis nec varius purus. Praesent hendrerit metus mi, at placerat est cursus tincidunt. Phasellus et vulputate nunc, sed blandit elit. In augue eros, feugiat in faucibus quis, elementum non urna. Duis odio urna, molestie sit amet sagittis ullamcorper, mattis id dolor. In nec finibus est, et viverra massa. Maecenas facilisis nisi ut erat blandit, in interdum tellus tincidunt. Etiam sed lorem ex. Nunc aliquam lectus at nisl tincidunt, quis vestibulum lorem commodo.",
      mainImageUrl: "/assets/images/image_test.png"
    },
    gallery: [
      {
        image: "https://picsum.photos/1200/1080",
        caption: "Project image 1"
      },
      {
        image: "https://picsum.photos/720/1080",
        caption: "Project image 1"
      },
      {
        image: "https://picsum.photos/1920/1080",
        caption: "Project image 2"
      },
      {
        image: "https://picsum.photos/1200/1080",
        caption: "Project image 1"
      },
      {
        image: "https://picsum.photos/1920/1080",
        caption: "Project image 2"
      },
      {
        image: "https://picsum.photos/720/1080",
        caption: "Project image 1"
      },
      {
        image: "https://picsum.photos/1200/1080",
        caption: "Project image 1"
      },
      {
        image: "https://picsum.photos/1920/1080",
        caption: "Project image 2"
      },
      {
        image: "https://picsum.photos/1200/1080",
        caption: "Project image 1"
      },
      {
        image: "https://picsum.photos/720/1080",
        caption: "Project image 1"
      },
      {
        image: "https://picsum.photos/720/1080",
        caption: "Project image 1"
      },
      {
        image: "https://picsum.photos/1920/1080",
        caption: "Project image 2"
      },
      {
        image: "https://picsum.photos/1200/1080",
        caption: "Project image 1"
      },
      {
        image: "https://picsum.photos/1920/1080",
        caption: "Project image 2"
      },
      {
        image: "https://picsum.photos/720/1080",
        caption: "Project image 1"
      },
      {
        image: "https://picsum.photos/1200/1080",
        caption: "Project image 1"
      },
      {
        image: "https://picsum.photos/1920/1080",
        caption: "Project image 2"
      },
      {
        image: "https://picsum.photos/1200/1080",
        caption: "Project image 1"
      },
      {
        image: "https://picsum.photos/1920/1080",
        caption: "Project image 2"
      },
    ],
    // gallery: [
    //   {
    //     type: "text-bigimage" as const,
    //     text: "[ Homepage ] / desktop",
    //     textBackgroundColor: "#FFFFFF",
    //     textColor: "#000000",
    //     rightImageUrl: "/assets/images/image_test.png",
    //     caption: "Homepage desktop"
    //   },
    //   {
    //     type: "text-bigimage" as const,
    //     text: "[ Locations ] / desktop",
    //     textBackgroundColor: "#111111",
    //     textColor: "#FFFFFF",
    //     rightImageUrl: "/assets/images/image_test.png",
    //     caption: "Locations desktop"
    //   },
    //   {
    //     type: "bigimage-text" as const,
    //     leftImageUrl: "https://picsum.photos/1920/1080",
    //     text: "[ Locations ] / desktop",
    //     textBackgroundColor: "red",
    //     textColor: "#FFFFFF",
    //     caption: "Locations page"
    //   },
    //   {
    //     type: "smallimage-bigimage" as const,
    //     leftImageUrl: "/assets/images/image_test.png",
    //     rightImageUrl: "/assets/images/image_test.png",
    //     caption: "Multiple views"
    //   },
    //   {
    //     type: "smallimage-bigimage" as const,
    //     leftImageUrl: "/assets/images/image_test.png",
    //     rightImageUrl: "https://picsum.photos/1920/1080",
    //     caption: "More views"
    //   }
    // ],
    footer: {
      linkToNextProject: "/project/next-project"
    }
  }
}

interface PageProps {
  params: {
    'project-name': string
  }
}

const ProjectPage = ({ params }: PageProps) => {
  const projectData = getProjectData(params['project-name'])

  return (
    <div className={styles.container}>
      <Overview {...projectData.overview} />
      <Gallery items={projectData.gallery} />
      <ProjectFooter {...projectData.footer} />
    </div>
  )
}

export default ProjectPage
