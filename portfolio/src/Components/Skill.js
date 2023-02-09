
function InputSkills(props) {
  const category_id = props.category_id;
  const skill_category_id=props.skill_category_id;
  const skillname=props.skillname;
  if (category_id===skill_category_id) {
    return <input type="button" value={skillname}/>
  }
  else{
  
  }
}

const Skill = (props) => {
  
 
    return (
      <>
      <section id="skills" className="skills">
        <h2>Mes compétences</h2>
        <div className="line_hr"></div>

        {props.category_skill.map((cat,i) => 

        <div className="category_skills" key={i}>
          <h3>{cat.name}</h3>
          <label>Compétences Associés</label>
          <div className="skills_associate">
            {props.skill.map((skill,p) =>
                <InputSkills key={p} category_id={cat._id} skill_category_id={skill.category}  skillname={skill.name}/>
            )}
          </div>
        </div>
        )}
      </section>
      </>
    )
}
export default Skill;