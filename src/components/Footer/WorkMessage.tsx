import React from 'react'
import styles from "@/styles/css/footer.module.css";
import { useLanguage } from '@/contexts/LanguageContext';

const WorkMessage = () => {
  const { currentContent } = useLanguage();
  const message = currentContent.footer.quickMessage;

  return (
    <div className={styles["work-message-container"]}>
      <span className={styles["work-message-text"]} dangerouslySetInnerHTML={{__html: message}}/>
    </div>
  )
}

export default WorkMessage