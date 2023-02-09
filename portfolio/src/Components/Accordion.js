import React, { useState } from 'react';

const Accordion = ({ eduction_school,diplome_title,diplome_level,education_start,education_end, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>{diplome_title} - {eduction_school}  {education_start} - {education_end}  </div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && content!="" && <div className="accordion-content">{content}</div>}
      {isActive && content==="" && <div className="accordion-content">Pas de description</div>}
    </div>
  );
};

export default Accordion;