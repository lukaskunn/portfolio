import React from "react";
import styles from "./ProjectItem.module.css";
import Link from "next/link";
import { PageContext } from "../../../../contexts/PageContext";
import gsap from "gsap";
import { useIsomorphicLayoutEffect, useHover } from "usehooks-ts";
// import { TransitionContext } from "../../../../Layouts/TransitionProvider";
// import type { TransitionContextType } from "../../../../Layouts/TransitionProvider";

type LinkHandlerProps = {
  goToExternalPage?: boolean;
  urlToProject?: string;
  projectId?: string;
  children: React.ReactNode;
};

const LinkHandler = ({
  goToExternalPage,
  urlToProject,
  children,
  projectId,
}: LinkHandlerProps) => {
  return goToExternalPage ? (
    <a href={urlToProject}>{children}</a>
  ) : (
    <Link href={`/project/${projectId}`} scroll={false}>
      {children}
    </Link>
  );
};
type IProjectItem = {
  title: string;
  index: number;
  description: string;
  projectId: string;
  goToExternalPage?: boolean;
  urlToProject?: string;
  updateModal: (index: number, modalIsActive: boolean) => void;
};

const ProjectItem = (props: IProjectItem) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const seeProjectTextRef = React.useRef<HTMLSpanElement>(null);
  // const { timeline } = React.useContext(
  //   TransitionContext,
  // ) as TransitionContextType;
  const isHovering = useHover(containerRef);
  const [canHover, setCanHover] = React.useState(false);
  const { isLoaded } = React.useContext(PageContext) as any;
  const {
    title,
    index,
    updateModal,
    description,
    projectId,
    goToExternalPage,
    urlToProject,
  } = props;

  useIsomorphicLayoutEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        gsap.to(containerRef.current, {
          y: 0,
          padding: "36px 0",
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.2,
          onComplete: () => {
            setCanHover(true);
          },
        });
      }, 1400);
    }
  }, [isLoaded]);

  // useIsomorphicLayoutEffect(() => {
  //   timeline.add(
  //     gsap.to(containerRef.current, {
  //       y: "20px",
  //       opacity: 0,
  //       padding: "120px 0",
  //       duration: 0.8,
  //       ease: "power3.out",
  //       delay: index * 0.2,
  //     }),
  //   );
  // }, []);

  React.useEffect(() => {
    if (!canHover) return;
    if (isHovering) {
      gsap.to(containerRef.current, {
        padding: "72px 0",
        duration: 0.2,
        ease: "power3.out",
      });

      gsap.to(seeProjectTextRef.current, {
        height: "100%",
        opacity: 1,
        duration: 0.2,
        ease: "power3.out",
      });
    } else {
      gsap.to(containerRef.current, {
        padding: "36px 0",
        duration: 0.2,
        ease: "power3.out",
      });

      gsap.to(seeProjectTextRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power3.out",
      });
    }
  }, [isHovering, canHover]);

  return (
    <LinkHandler
      goToExternalPage={goToExternalPage}
      urlToProject={urlToProject}
      projectId={projectId}
    >
      <div
        className={styles["project-item-container"]}
        ref={containerRef}
        onMouseEnter={() => updateModal(index, true)}
        onMouseLeave={() => updateModal(index, false)}
      >
        <p
          dangerouslySetInnerHTML={{
            __html: index < 10 ? `0${index + 1}` : index + 1,
          }}
          className={styles["project-index"]}
        />
        <div className={styles["project-description-container"]}>
          <div className={styles["project-title-container"]}>
            <h2
              className={styles["project-title"]}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <span
              className={styles["see-project-text"]}
              ref={seeProjectTextRef}
            >
              Click to see project
            </span>
          </div>
          <p
            className={styles["project-description"]}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </LinkHandler>
  );
};

export default ProjectItem;
