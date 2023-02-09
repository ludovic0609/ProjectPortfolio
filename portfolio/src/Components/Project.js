
import { useState,useEffect } from "react";

function AhrefLink(props) {
  const website = props.website;
  const link_github=props.link_github;
  if (website!=="") {
    return <a href={website} target="_blank">Liens</a>
  }
  else if (link_github!=="") {
    return <a href={link_github} target="_blank">Liens</a>
  }
  else{
    return <a href="">Liens</a>
  }
}

const Project = (props) => {
  const [listProjects, setListProjects] = useState(props.project);

  useEffect(() => {
    setListProjects(props.project);
}, [props.project])

  const handleClick = (event) => {
    const id_category=event;
    if(id_category!="all"){
      const newListProjects = [];
      props.project.forEach((project, index) => project.category === id_category ? newListProjects.push(project) : null)
      setListProjects(newListProjects);
    }else{
      setListProjects(props.project);
    }
    
  };
    return (
      <>
      <section id="project" className="project">
        <h2>Mes projets</h2>
        <div className="line_hr"></div>

        <ul className="project_list_category">
            <li><input type="button" value="Tous" onClick={(e)=> handleClick("all")}/></li>
          {props.category_project.map((category, k) =>
            <li key={k}><input type="button" value={category.name} onClick={(e)=> handleClick(category._id)}/></li>
          )}
        </ul>

          <div className="cards-container">
            {listProjects.map((project, i) =>
              <div className="card" key={i}>
                <div className="card_title">
                  <h3>{project.title} </h3>
                </div>
                <div className="img_card">
                  <img src={"/uploads/projets/"+project.image_project } alt={project.title}/>
                </div>
                <p className="label">{project.description}</p>
                <div className="list_ressources_card">
                    <ul>
                      {project.ressources.map((ressource, j) =>
                        <li key={j}>{ressource}</li>
                      )}
                    </ul>
                </div>
                <AhrefLink website={project.website} link_github={project.link_github}/>
              </div>
              )}
          </div>
      </section>
      </>
    )
}
export default Project;