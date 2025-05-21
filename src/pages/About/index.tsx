import React, { useEffect } from "react";
import { useHover } from "usehooks-ts"
import { useLanguage } from "../../contexts/LanguageContext";
import { useCursor } from "../../contexts/CursorContext";
import NextPageButton from "../../components/NextPageButton";
import ResumeCard from "./components/ResumeCard";
import Curve from "../../Layouts/Curve";
import about from "./About.module.scss";

function About() {
  const { setHoverImportantText } = useCursor();
  const { currentLanguage } = useLanguage();
  const { aboutMe, resume, services } = currentLanguage;
  const {
    nextPageText,
    sectionSubTitle,
    content,
  } = aboutMe;
  const { sectionTitle: sectionTitleResume, cards } = resume;
  const { sectionTitle: sectionTitleServices, skills } = services;
  const { soft, hard } = skills;
  const aboutTitleRef = React.useRef(null);
  const aboutMeRef = React.useRef(null);
  const aboutBackgroundRef = React.useRef(null);
  const resumeRef = React.useRef(null);
  const skillsRef = React.useRef(null);
  const aboutTitleIsHover = useHover(aboutTitleRef);
  const aboutMeIsHover = useHover(aboutMeRef);
  const aboutBackgroundIsHover = useHover(aboutBackgroundRef);
  const resumeIsHover = useHover(resumeRef);
  const skillsIsHover = useHover(skillsRef);

  useEffect(() => {
    if (aboutTitleIsHover || aboutMeIsHover || aboutBackgroundIsHover || resumeIsHover || skillsIsHover) {
      setHoverImportantText(true)
    } else {
      setHoverImportantText(false)
    }
  }, [aboutTitleIsHover, aboutMeIsHover, aboutBackgroundIsHover, resumeIsHover, skillsIsHover]);

  useEffect(() => {
    document.body.style.overflowX = "auto";
  }, []);

  return (
    <Curve>
      <section className={about.container}>
        <div className={about.about} id={"about"}>
          <div className={about.about__left}>
            <img
              src="https://64.media.tumblr.com/723de3a38fae9be2c3840107091e6f3d/tumblr_pg37vjbDgu1v1hotuo2_500.gifv"
              alt=""
              className="anime_computer_gif"
            />
          </div>
          <div className={about.about__right}>
            <h2 ref={aboutTitleRef} dangerouslySetInnerHTML={{ __html: sectionSubTitle }} />
            <section className={about.about__right__aboutMe} ref={aboutMeRef}>
              <h2 dangerouslySetInnerHTML={{ __html: content[0].title }} />
              {content[0].text.map((element: any, index: any) => {
                return <h4 key={index}>{element}</h4>;
              })}
            </section>
            <section className={about.about__right__background} ref={aboutBackgroundRef}>
              <h2 dangerouslySetInnerHTML={{ __html: content[1].title }} />
              {content[1].text.map((element: any, index: any) => {
                return <h4 key={index} dangerouslySetInnerHTML={{ __html: element }} />
              })}
              <br />
            </section>
          </div>
        </div>
      </section>
      <section className={about["resume-container"]}>
        <div className={about.resume} id="resume">
          <div className={about.resume__left}>
            <h2 className={about["section-title"]} dangerouslySetInnerHTML={{ __html: sectionTitleResume }} />
            <div className={about.colletions} ref={resumeRef}>
              {cards.map((card: any, index: any) => {
                const { jobTitle, description, startDate, endDate, company } =
                  card;
                return (
                  <ResumeCard
                    key={index}
                    title={jobTitle}
                    description={description}
                    startDate={startDate}
                    endDate={endDate}
                    company={company}
                  />
                );
              })}
            </div>
          </div>
          <div className={about.resume__right}>
            <img
              src="https://i.pinimg.com/originals/ab/e5/57/abe557b5780fc93e83447ac60987d000.gif"
              alt=""
              className="anime_computer_gif"
            />
          </div>
        </div>
      </section>
      <section className={about["skills-container"]}>
        <h2 dangerouslySetInnerHTML={{ __html: sectionTitleServices }} />
        <div className={about["skills-sub-container"]} ref={skillsRef}>
          <div className={about["soft-skills"]}>
            <h3 className={about["group-title"]} dangerouslySetInnerHTML={{ __html: '[Soft Skills]' }} />
            {soft.map((skill: any, index: any) => {
              return (
                <p className={skill["skill-list"]} key={`${skill}_${index}`} dangerouslySetInnerHTML={{ __html: `/ ${skill}` }} />
              );
            })}
          </div>
          <div className={about["hard-skills"]}>
            <h3 className={about["group-title"]} dangerouslySetInnerHTML={{ __html: '[Hard Skills]' }} />
            {hard.map((skill: any, index: any) => {
              return (
                <p className={skill["skill-list"]} key={`${skill}_${index}`} dangerouslySetInnerHTML={{ __html: `/ ${skill}` }} />
              );
            })}
          </div>
        </div>
      </section>
      <NextPageButton link="/Contact" text={nextPageText} type="forward" showBackground={true} />
    </Curve>
  );
}

export default About;
