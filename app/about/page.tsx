import React from "react";

import AboutSection from "./components/AboutSection";
import ResumeSection from "./components/ResumeSection";
import SkillsSection from "./components/SkillsSection";
import NextButtonContainer from "./NextPageButtonContainer";

function About() {
  return (
    <>
      <AboutSection />
      <ResumeSection />
      <SkillsSection />
      <NextButtonContainer />
    </>
  );
}

export default About;
