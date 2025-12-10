"use client";
import React, { useState, useContext, createContext } from "react";
import type { Project } from "@/utils/types";

interface ProjectModalContextType {
  modal: {
    isActive: boolean;
    index: number;
    projects: Project[];
  };
  updateModal: (index: number, modalIsActive: boolean) => void;
}

const ProjectModalContext = createContext<ProjectModalContextType | undefined>(
  undefined,
);

interface ProjectModalContextProviderProps {
  children: React.ReactNode;
}

const projects = [
  {
    "projectId": "5",
    "title": "[Motorola Europe]",
    "description": "Vtex IO + React",
    "briefDescription": "In my current role at Motorola Europe, I am spearheading the development of a groundbreaking re-branded layout for the Motorola Europe e-commerce store. Collaborating closely with a team of skilled developers and designers, our mission is to elevate the online shopping experience for Motorola customers across Europe.</>Leveraging cutting-edge technologies such as Vtex IO, React, TypeScript, and Node.js, we are not only revamping the store's aesthetics but also enhancing its performance and usability. My role involves conceptualizing and implementing innovative features that seamlessly integrate into the new layout, ensuring a smooth and intuitive user journey.</> A pivotal aspect of this project has been my involvement with the Vtex API, enabling me to introduce new functionalities and optimize the store's performance. By harnessing the power of this API, we have been able to unlock new possibilities and push the boundaries of what the e-commerce platform can achieve.</>One of the most rewarding achievements of this endeavor has been the creation of the new Motoverse pages layout. By developing a custom no-code builder for each page, we hpave empowered the marketing team to generate dynamic new pages autonomously, without the reliance on a developer. This innovation not only streamlines the content creation process but also fosters agility and flexibility within the organization.</>As we continue to refine and evolve the Motorola Europe e-commerce store, I am excited to be at the forefront of delivering a truly transformative digital experience for our customers.",
    "urlToProject": "https://www.motorola.co.uk",
    "galleryBackground": "/assets/images/projects/motorola_europe/image_modal.png",
    "imageAlt": "Motorola Europe Project Image",
    "galleryBackgroundColor": "#922724",
    "technologies": [
      "React",
      "Vtex IO",
      "TypeScript",
      "Node.js"
    ],
    "galleryImages": [
      [
        {
          "front": "/assets/images/projects/motorola_europe/image_7.png",
          "back": "/assets/images/projects/motorola_europe/image_8.png",
          "photoText": "[Motoverse Homepage]"
        },
        {
          "front": "/assets/images/projects/motorola_europe/image_9.png",
          "back": "/assets/images/projects/motorola_europe/image_10.png",
          "photoText": "[Motoverse Landing Page]"
        }
      ],
      [
        {
          "front": "/assets/images/projects/motorola_europe/image_1.png",
          "back": "/assets/images/projects/motorola_europe/image_2.png",
          "photoText": "[Homepage]"
        },
        {
          "front": "/assets/images/projects/motorola_europe/image_3.png",
          "back": "/assets/images/projects/motorola_europe/image_3.png",
          "photoText": "[Product Page]"
        },
        {
          "front": "/assets/images/projects/motorola_europe/image_5.png",
          "back": "/assets/images/projects/motorola_europe/image_6.png",
          "photoText": "[Family Page]"
        }
      ]
    ]
  },
  {
    "projectId": "1",
    "imageAlt": "Motorola Europe Project Image",
    "title": "[Motorola India]",
    "description": "Ecommerce + React",
    "briefDescription": "During my tenure with the Motorola India team, I served as the lead developer on a pivotal project: the development of the Motorola India E-commerce Store. In this capacity, I assumed the role of both a developer and a mentor, guiding fellow team members while tackling the most complex challenges head-on.</>This project provided me with invaluable opportunities for personal and professional growth. Notably, I honed my leadership skills, fostering a more accessible and collaborative environment within our team. Through hands-on experience with cutting-edge technologies such as React and Vtex IO, I expanded my technical expertise significantly. </>Throughout the development cycle, I played a key role in implementing numerous features and resolving critical issues. One standout accomplishment was the optimization of an autofill function during the checkout process, drastically reducing the time required from approximately 15 seconds to a mere 2 seconds. This enhancement streamlined the user experience and significantly boosted efficiency.</>Beyond technical accomplishments, my time with Motorola India also presented opportunities for linguistic development. Engaging in daily meetings with the Motorola India Project Manager, I sharpened my English language skills while ensuring seamless project alignment and progress tracking.",
    "urlToProject": "https://www.motorola.in",
    "galleryBackground": "/assets/images/projects/motorola_india/motorola_india_image_1.png",
    "galleryBackgroundColor": "#000",
    "technologies": [
      "React",
      "Vtex IO",
      "TypeScript",
      "Node.js"
    ],
    "galleryImages": [
      [
        {
          "front": "/assets/images/projects/motorola_india/motorola_india_image_1.png",
          "back": "/assets/images/projects/motorola_india/motorola_india_image_1.png",
          "photoText": "[Motorola India Home Page]"
        }
      ]
    ]
  },
  {
    "projectId": "2",
    "title": "[Motorola US]",
    "imageAlt": "Motorola US Project Image",
    "description": "Ecommerce + React",
    "briefDescription": "My inaugural project with Vtex IO marked a pivotal moment in my career journey. Tasked with developing key components for the launch of the Edge 30 Pro product page, I collaborated within a dedicated team environment. </> This project provided me with the unique opportunity to interface directly with the marketing team at Motorola USA. This exposure not only enriched my understanding of web development but also fostered invaluable insights into the intersection of technology and marketing strategies. </> Working alongside seasoned developers, I immersed myself in the intricacies of web development, refining my skills and techniques. Moreover, this project served as a catalyst for my English language proficiency, as I embraced the challenge of effectively communicating with international stakeholders.",
    "urlToProject": "https://www.motorola.com/us/",
    "galleryBackground": "/assets/images/projects/motorola_us/motorola_us_image_1.png",
    "galleryBackgroundColor": "#c6c6c6",
    "technologies": [
      "React",
      "Vtex IO",
      "TypeScript",
      "Node.js"
    ],
    "galleryImages": [
      [
        {
          "front": "/assets/images/projects/motorola_us/motorola_us_image_1.png",
          "back": "/assets/images/projects/motorola_us/motorola_us_image_1.png",
          "photoText": "[Edge 30 PRO Page]"
        }
      ]
    ]
  },
  {
    "projectId": "3",
    "title": "Karsten / Trussardi",
    "description": "Ecommerce + React",
    "imageAlt": "Karsten / Trussardi Project Image",
    "briefDescription": "My tenure with Karsten and Trussardi e-commerce stores was instrumental in shaping my expertise in front-end development and Vtex platform utilization. Tasked with developing new features and resolving existing issues, I delved deep into the intricacies of front-end development within the Vtex ecosystem.</>Operating within the realm of Vtex legacy, I honed my skills in HTML and CSS, leveraging these foundational technologies to enhance the user experience and functionality of both platforms. This hands-on experience not only expanded my technical repertoire but also instilled in me a deep understanding of front-end principles and best practices.",
    "urlToProject": "https://www.karsten.com.br",
    "galleryBackground": "/assets/images/projects/trussardi/trussardi_image_1.png",
    "galleryBackgroundColor": "orange",
    "technologies": [
      "React",
      "Vtex Legacy"
    ],
    "galleryImages": [
      [
        {
          "front": "/assets/images/projects/trussardi/trussardi_image_1.png",
          "back": "/assets/images/projects/trussardi/trussardi_image_1.png",
          "photoText": "[Trussardi Home Page]"
        }
      ]
    ]
  },
  {
    "projectId": "4",
    "title": "BabadoTop",
    "description": "Ecommerce + React",
    "imageAlt": "BabadoTop Project Image",
    "briefDescription": "My experience at this particular storefront proved to be one of the most challenging yet rewarding endeavors in my career journey. Over the span of two intense months, I immersed myself in the world of ReactJS, delving into its advanced features and pushing the boundaries of my technical skill set. </> During my tenure, I conceptualized and developed a groundbreaking component reminiscent of an Instagram story. This innovative feature seamlessly integrated a virtual fitting room with a customizable shelf, empowering customers to visualize products in a dynamic and engaging manner while facilitating effortless purchasing decisions. </> Harnessing the power of Vtex legacy alongside HTML and CSS, I crafted bespoke solutions tailored to the unique requirements of the storefront. Additionally, I leveraged my newfound expertise in ReactJS to create custom components that elevated the user experience to new heights. </> My time at this storefront not only deepened my understanding of front-end development but also underscored the importance of innovation and adaptability in the ever-evolving landscape of e-commerce. Through perseverance and creative problem-solving, I overcame formidable challenges and emerged with newfound confidence and proficiency in ReactJS and e-commerce development.",
    "galleryBackground": "/assets/images/projects/babadotop/babadotop_image_1.png",
    "galleryBackgroundColor": "blue",
    "urlToProject": "https://www.babadotop.com.br",
    "technologies": [
      "React",
      "Vtex Legacy"
    ],
    "galleryImages": [
      [
        {
          "front": "/assets/images/projects/babadotop/babadotop_image_1.png",
          "back": "/assets/images/projects/babadotop/babadotop_image_1.png",
          "photoText": "[Babadotop Home Page]"
        }
      ]
    ]
  },
  {
    "projectId": "6",
    "title": "Personal Stuff",
    "imageAlt": "Personal Stuff Project Image",
    "description": "Next.js / Three.js / GSAP / Framer Motion",
    "urlToProject": "/my-stuff",
    "galleryBackground": "/assets/images/projects/myStuff/glass-effect-background.png",
    "galleryBackgroundColor": "#922724",
    "goToExternalPage": true
  }
]

export const ProjectModalContextProvider: React.FC<
  ProjectModalContextProviderProps
> = ({ children }) => {
  const [modal, setModal] = useState({
    isActive: false,
    index: 0,
    projects,
  });

  const updateModal = (index: number, modalIsActive: boolean) => {
    setModal((prev) => ({ ...prev, isActive: modalIsActive, index }));
  };

  const value: ProjectModalContextType = {
    modal,
    updateModal,
  };

  return (
    <ProjectModalContext.Provider value={value}>
      {children}
    </ProjectModalContext.Provider>
  );
};

export const useProjectModalContext = (): ProjectModalContextType => {
  const context = useContext(ProjectModalContext);

  if (context === undefined) {
    throw new Error(
      "useProjectModalContext must be used within a ProjectModalContextProvider",
    );
  }

  return context;
};
