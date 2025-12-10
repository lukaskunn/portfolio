import React from 'react'
import styles from "@/styles/css/project.module.css"
import Link from 'next/link'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";


interface ProjectFooterProps {
  linkToNextProject: string
}

const ProjectFooter = ({ linkToNextProject }: ProjectFooterProps) => {
  return (
    <div className={styles["project-footer"]}>
      <div className={styles["footer-navigation"]}>
        <Link href="/projects" className={styles["nav-link"]}>
          <span className={styles["nav-icon"]}>
            <FaArrowLeft size={20}/>
          </span>
          <span className={styles["nav-text"]}>Back to all works</span>
        </Link>

        <div className={styles["footer-center"]}>
          <p className={styles["footer-message"]}>Interested to see more?</p>
        </div>

        <Link href={linkToNextProject} className={styles["nav-link"]}>
          <span className={styles["nav-text"]}>Next project</span>
          <span className={styles["nav-icon"]}>
            <FaArrowRight size={20}/>
          </span>
        </Link>
      </div>

      <div className={styles["cta-section"]}>
        <p className={styles["cta-subtitle"]}>Any project idea?</p>
        <Link href="/contact" className={styles["cta-title"]}>
          LET'S CHAT
          <span className={styles["cta-icon"]}>
            <FiArrowUpRight />
          </span>
        </Link>
      </div>
    </div>
  )
}

export default ProjectFooter
