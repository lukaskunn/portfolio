import React from "react";

import resumeCard from "./resumeCard.module.css";

function ResumeCard(props: any) {
  return (
    <div className={resumeCard.resumeCard} id="resume-card">
      <h2 className={resumeCard.resumeCard__title}>{props?.title}</h2>
      <div className={resumeCard.resumeCard__mainInformation}>
        <h3 className={resumeCard.resumeCard__company}>{props?.company}</h3>
        <p className={resumeCard.resumeCard__date}>
          <span>{props?.startDate}</span> - <span>{props?.endDate}</span>
        </p>
      </div>
      <p className={resumeCard.resumeCard__description}>{props?.description}</p>
    </div>
  );
}

export default ResumeCard;
