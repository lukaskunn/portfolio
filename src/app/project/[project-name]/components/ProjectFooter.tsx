import React from 'react'
import styles from "@/styles/css/project.module.css"
import Link from 'next/link'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import LinkHandler from '@/components/LinkHandler';

interface ProjectFooterProps {
  linkToNextProject: string
}

const ProjectFooter = ({ linkToNextProject }: ProjectFooterProps) => {
  return (
    <div className={styles["project-footer"]}>
      <div className={styles["cta-section"]}>
        <p className={styles["cta-subtitle"]}>Any project idea?</p>
        <LinkHandler href="/contact" className={styles["cta-title"]}>
          LET&apos;S CHAT
          <span className={styles["cta-icon"]}>
            <FiArrowUpRight />
          </span>
        </LinkHandler>
      </div>
      <div className={styles["footer-navigation"]}>
        <LinkHandler href="/projects" className={styles["nav-link"]}>
          <span className={styles["nav-text"]}>Back to all works</span>
          <span className={styles["nav-icon"]}>
            <FaArrowRight size={20} />
          </span>
        </LinkHandler>

        <LinkHandler href={linkToNextProject} className={styles["nav-link"]}>
          <span className={styles["nav-text"]}>Next project</span>
          <span className={styles["nav-icon"]}>
            <FaArrowRight size={20} />
          </span>
        </LinkHandler>
      </div>
    </div>
  )
}

export default ProjectFooter
