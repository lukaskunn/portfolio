import React from "react";
import resumeCard from "./resumeCard.module.css";

interface ResumeCardProps {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  title,
  company,
  startDate,
  endDate,
  description,
}) => {
  return (
    <div className={resumeCard.resumeCard} id="resume-card">
      <h2 className={resumeCard.resumeCard__title} dangerouslySetInnerHTML={{ __html: title }} />
      <div className={resumeCard.resumeCard__mainInformation}>
      <h3 className={resumeCard.resumeCard__company} dangerouslySetInnerHTML={{ __html: company }} />
      <p className={resumeCard.resumeCard__date}>
        <span dangerouslySetInnerHTML={{ __html: startDate }} /> - <span dangerouslySetInnerHTML={{ __html: endDate }} />
      </p>
      </div>
      <p className={resumeCard.resumeCard__description} dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};

export default ResumeCard;
