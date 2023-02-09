
import {displayDateYear} from "../utils/utils";

//import des font awesomes
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBriefcase,faCalendar,faFlag } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faCalendar, faFlag,faBriefcase);

const WorkExperience = (props) => {
  
 
    return (
      <>

<section id="workexperience" className="workexperience">
  <div className="row ">
    <div className="sectiontitle">
      <h2>Expérience professionnelle</h2>
      <div className="line_hr"></div>
    </div>
    <div className="fullWidth eight columns">
      <ul className="cbp_tmtimeline">
      {props.workexperience.map((work,i) => 
        <li key={i}>
          <div className="cbp_tmicon cbp_tmicon-phone">
          <FontAwesomeIcon icon="briefcase" className="icon_work"/>
          </div>
          <div className="cbp_tmlabel wow fadeInRight animated">
            <h3>{work.title_job}</h3>
            <div className="date">
            <FontAwesomeIcon icon="calendar" className="icon_calendar"/>{displayDateYear(work.date_start_work)} - {displayDateYear(work.date_end_work)}
            </div>
            <h4><FontAwesomeIcon icon="flag" className="icon_flag"/>{work.name_company}</h4>
            <p className="workParagraph">{work.description}</p>
            <div className="workListTask">
              <p>Liste des taches :</p>
              <ul>
              {work.tasks.map((task,k) => 
                <li key={k}>{task}</li>
                )}
              </ul>
            </div>
          </div>
        </li>
      )}
      </ul>
    </div>
  </div>
</section>
      </>
    )
}
export default WorkExperience;