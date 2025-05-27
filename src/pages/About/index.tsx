import React, { useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import NextPageButton from "../../components/NextPageButton";

import AboutSection from "./components/AboutSection";
import ResumeSection from "./components/ResumeSection";
import SkillsSection from "./components/SkillsSection";

function About() {
  const { currentLanguage } = useLanguage();
  const { aboutMe, resume, services } = currentLanguage;
  const { nextPageText, sectionSubTitle, content } = aboutMe;
  const { sectionTitle: sectionTitleResume, cards } = resume;
  const { sectionTitle: sectionTitleServices, skills } = services;
  const { soft, hard } = skills;

  useEffect(() => {
    document.body.style.overflowX = "auto";
  }, []);

  return (
    <>
      <AboutSection sectionSubTitle={sectionSubTitle} content={content} />
      <ResumeSection sectionTitleResume={sectionTitleResume} cards={cards} />
      <SkillsSection
        sectionTitleServices={sectionTitleServices}
        hard={hard}
        soft={soft}
      />
      <NextPageButton
        link="/Contact"
        text={nextPageText}
        type="forward"
        showBackground={true}
      />
    </>
  );
}

export default About;
