import React from "react";
import NextPageButton from "../../components/NextPageButton";
import { useLanguage } from "../../contexts/LanguageContext";

import AboutSection from "../../components/AboutSection";
import ResumeSection from "../../components/ResumeSection";
import SkillsSection from "../../components/SkillsSection";

import Inner from "../../components/Inner";

function About() {
  const { currentLanguage } = useLanguage();
  const { aboutMe, resume, services } = currentLanguage;
  const { nextPageText, sectionSubTitle, content } = aboutMe;
  const { sectionTitle: sectionTitleResume, cards } = resume;
  const { sectionTitle: sectionTitleServices, skills } = services;
  const { soft, hard } = skills;

  return (
    <Inner backgroundColor="#ff00ff">
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
    </Inner>
  );
}

export default About;
