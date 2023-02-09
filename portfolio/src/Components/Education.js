
import {displayDateMonthYear} from "../utils/utils";

import Accordion from './Accordion';

const Education = (props) => {
  
 
    return (
      <>
      <section id="education" className="education">
        <h2>Mon parcours scolaire</h2>
        <div className="line_hr"></div>
        <div className="accordion">
          {props.education.map((education, i) =>
          <Accordion key={i} eduction_school={education.name_school} diplome_title={education.title_diplome} 
          diplome_level={education.level_diplome} 
          education_start={displayDateMonthYear(education.date_start_education)} education_end={displayDateMonthYear(education.date_end_education)}
           content={education.description} />
        )}
      </div>
  
  </section>

      </>
    )
}
export default Education;