import Header from "./Header";
import About from "./About";
import Skill from "./Skill";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import Project from "./Project";
import Footer from "./Footer";

import { NavLink } from "react-router-dom";

import { useState,useEffect } from "react";

const Home = () => {

  const [profil, setProfil] = useState({civilite:"", firstname:"",lastname:"",date_of_year:"",
  title:"",description:"",my_situation:"",adresse:"",code_postal:"",
  commune:"",telephone:"",picture_profil:"",file_cv:""});

  const [listCategorySkill, setListCategorySkill] = useState([]);
  const [listCategoryProject, setListCategoryProject] = useState([]);
  const [listEducation, setListEducation] = useState([]);
  const [listWorkExperience, setListWorkExperience] = useState([]);
  const [listSkill, setListSkill] = useState([]);
  const [listProject, setListProject] = useState([]);



  useEffect(() => {
    fetch('http://localhost:8080/profil')
    .then(
      response => response.json())
    .then(res => {
      setProfil(res[0]);
    });

    fetch('http://localhost:8080/skill/category')
    .then(
      response => response.json())
    .then(res => {
      setListCategorySkill(res);

    fetch('http://localhost:8080/project/category')
      .then(
        response => response.json())
      .then(res => {
        setListCategoryProject(res);
        
      });

    fetch('http://localhost:8080/skill')
      .then(
        response => response.json())
      .then(res => {
        setListSkill(res); 
      });
      
    });

  fetch('http://localhost:8080/project')
      .then(
        response => response.json())
      .then(res => {
        setListProject(res); 
      });

    fetch('http://localhost:8080/educationbydate')
      .then(
        response => response.json())
      .then(res => {
          setListEducation(res); 
      });

    fetch('http://localhost:8080/workexperiencebydate')
      .then(
        response => response.json())
      .then(res => {
          setListWorkExperience(res); 
      });

    
  
  }, []);
 
    return (
      <>
              <Header/>
              <main>
                  <section id="myprofil" className="myprofil">
                    <div className="info_profil">
                        <h1>{profil.lastname} {profil.firstname}</h1>
                        <p>{profil.title}</p>
                        {profil.file_cv !== "" &&
                        <NavLink to={"uploads/profil/cv/"+profil.file_cv} className="myButton" target="_blank">Voir mon CV</NavLink>
                        }
                    </div>
                  </section>
                  <About profil={profil}/>
                  <Skill skill={listSkill} category_skill={listCategorySkill} />
                  <WorkExperience workexperience={listWorkExperience}/>
                  <Education education={listEducation}/>
                  <Project project={listProject} category_project={listCategoryProject}/>
              </main>
              <Footer/>
      </>
    )
}
export default Home;