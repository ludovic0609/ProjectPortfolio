//import du style admin pour le backend du portfolio
import '../../css/admin.css';

import NavAdmin from "./Nav";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import {displayDate} from "../../utils/utils";

import { useState,useEffect } from "react";

const Home = () => {
  
  const [listCategorySkill, setListCategorySkill] = useState([]);
  const [listCategoryProject, setListCategoryProject] = useState([]);

  const [listEducation, setListEducation] = useState([]);
  const [removeEducation, setRemoveEducation] = useState(false);

  const [listWorkExperience, setListWorkExperience] = useState([]);
  const [removeWorkExperience, setRemoveWorkExperience] = useState(false);

  const [listSkill, setListSkill] = useState([]);
  const [removeSkill, setRemoveSkill] = useState(false);

  const [listProject, setListProject] = useState([]);
  const [removeProject, setRemoveProject] = useState(false);


  useEffect(() => {
    fetch('http://localhost:8080/skill/category')
    .then(
      response => response.json())
    .then(res => {
      setListCategorySkill(res);
      
    });

  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/project/category')
    .then(
      response => response.json())
    .then(res => {
      setListCategoryProject(res);
      
    });

  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/skill')
      .then(
        response => response.json())
      .then(res => {
        setListSkill(res); 
      });

  }, [listCategorySkill]);

  useEffect(() => {
    fetch('http://localhost:8080/project')
      .then(
        response => response.json())
      .then(res => {
        setListProject(res); 
      });

  }, [listCategoryProject]);



  useEffect(() => {

    fetch('http://localhost:8080/education')
      .then(
        response => response.json())
      .then(res => {
          setListEducation(res); 
      });

      fetch('http://localhost:8080/workexperience')
      .then(
        response => response.json())
      .then(res => {
          setListWorkExperience(res); 
      });

      

  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/education')
      .then(
        response => response.json())
      .then(res => {
        setListEducation(res); 
      });

  }, [removeEducation,listEducation]);

  useEffect(() => {
    fetch('http://localhost:8080/workexperience')
      .then(
        response => response.json())
      .then(res => {
        setListWorkExperience(res); 
      });

  }, [removeWorkExperience,listWorkExperience]);

  useEffect(() => {
    fetch('http://localhost:8080/skill')
      .then(
        response => response.json())
      .then(res => {
        setListSkill(res); 
      });

  }, [removeSkill,listSkill]);

  useEffect(() => {
    fetch('http://localhost:8080/project')
      .then(
        response => response.json())
      .then(res => {
        setListProject(res); 
      });

  }, [removeProject,listProject]);


  const handleDeleteEducation = (event) =>{
  const id_education=event;

  fetch('http://localhost:8080/delete/education/'+id_education, {
            method: "DELETE",
            headers: {
                'Content-type': 'text/html'
              },
              body: ""
          })
          .then((response) => response.json())
          .then((result) => {
            if(result) setRemoveEducation(true);
          })
};

const handleDeleteWorkExperience = (event) =>{
  const id_work=event;
  fetch('http://localhost:8080/delete/workexperience/'+id_work, {
          method: "DELETE",
          headers: {
              'Content-type': 'text/html'
            },
            body: ""
        })
        .then((response) => response.json())
        .then((result) => {
          if(result) setRemoveWorkExperience(true);
        })
};

const handleDeleteSkill = (event) =>{
  const id_skill=event;
  fetch('http://localhost:8080/delete/skill/'+id_skill, {
          method: "DELETE",
          headers: {
              'Content-type': 'text/html'
            },
            body: ""
        })
        .then((response) => response.json())
        .then((result) => {
          if(result) setRemoveSkill(true);
        })
};

const handleDeleteProject = (event) =>{
  const id_project=event;
  fetch('http://localhost:8080/delete/project/'+id_project, {
          method: "DELETE",
          headers: {
              'Content-type': 'text/html'
            },
            body: ""
        })
        .then((response) => response.json())
        .then((result) => {
          if(result) setRemoveProject(true);
        })
};

    return (
        <>
        <NavAdmin/>

          <label className="label_dashboard">Les compétences <NavLink  to="/admin/add/skill"><FontAwesomeIcon className='add-icon' icon={faCirclePlus} title="Ajouter une compétence" /></NavLink></label>
        <table>
  <thead>
    <tr>
    <th scope="col">Nom</th>
      <th scope="col">Catégorie</th>
      <th scope="col">Niveau</th>
      <th scope="col">Etoile</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {listSkill.map((skill, i) => <tr key={i}>
      
      <td data-label="Nom">{skill.name}</td>
      <td data-label="Catégorie">{listCategorySkill.filter(obj => obj._id === skill.category).map((cat) => cat.name)}</td>
      <td data-label="Niveau">{skill.level}</td>
      <td data-label="Etoile">{skill.stars}</td>
      <td data-label="action"> <NavLink  to={"/admin/edit/skill/"+skill._id}><FontAwesomeIcon  icon={faEdit} /></NavLink> <NavLink  onClick={(e) =>{handleDeleteSkill(skill._id)}}><FontAwesomeIcon  icon={faTrash} /></NavLink></td>
    </tr>)}   
  </tbody>
</table>

<label className="label_dashboard">Les projets <NavLink  to="/admin/add/project"><FontAwesomeIcon className='add-icon' icon={faCirclePlus} title="Ajouter un projet" /></NavLink></label>
<table>
  <thead>
    <tr>
    <th scope="col">Titre</th>
      <th scope="col">Catégorie</th>
      <th scope="col">Description</th>
      <th scope="col">Site</th>
      <th scope="col">Image</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {listProject.map((project, i) => <tr key={i}>
      
      <td data-label="Titre du projet">{project.title}</td>
      <td data-label="Catégorie">{listCategoryProject.filter(obj => obj._id === project.category).map((cat) => cat.name)}</td>
      <td data-label="Description">{project.description}</td>
      <td data-label="Site"><a href={project.website} target="_blank">Lien du site</a></td>
      {project.image_project != "" &&
      <td data-label="Image"><img src={"/uploads/projets/"+project.image_project } alt={project.title} /></td>
      }

      <td data-label="action"> <NavLink  to={"/admin/edit/project/"+project._id}><FontAwesomeIcon  icon={faEdit} /></NavLink> <NavLink  onClick={(e) =>{handleDeleteProject(project._id)}}><FontAwesomeIcon  icon={faTrash} /></NavLink></td>
    </tr>)}   
  </tbody>
</table>
<label className="label_dashboard"> Les expériences professionnelles <NavLink  to="/admin/add/workExperience"><FontAwesomeIcon className='add-icon' icon={faCirclePlus} title="Ajouter une expérience professionnelle"/></NavLink></label>
<table>
  <thead>
    <tr>
    <th scope="col">Entreprise</th>
      <th scope="col">Titre</th>
      <th scope="col">Description</th>
      <th scope="col">Site Web</th>
      <th scope="col">Date de début</th>
      <th scope="col">Date de fin</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {listWorkExperience.map((work, i) => <tr key={i}>
    
    <td data-label="Entreprise">{work.name_company}</td>
    <td data-label="Titre du job">{work.title_job}</td>
    <td data-label="Description">{work.description}</td>
    <td data-label="Site Web"><a href={work.website} target="_blank">Lien du site</a></td>
    <td data-label="Date de début">{displayDate(work.date_start_work)} </td>
    <td data-label="Date de fin">{displayDate(work.date_end_work)}</td>
    <td data-label="action"> <NavLink  to={"/admin/edit/workexperience/"+work._id}><FontAwesomeIcon  icon={faEdit} /></NavLink> <NavLink  onClick={(e) =>{handleDeleteWorkExperience(work._id)}}><FontAwesomeIcon  icon={faTrash} /></NavLink></td>

  </tr>)}   
  </tbody>
</table>
<label className="label_dashboard">Les diplomes/formations <NavLink  to="/admin/add/education"><FontAwesomeIcon className='add-icon' icon={faCirclePlus} title="Ajouter un diplome/formation"/></NavLink></label>
<table>
  <thead>
    <tr>
    <th scope="col">Ecole</th>
      <th scope="col">Diplome</th>
      <th scope="col">Niveau</th>
      <th scope="col">Date de début</th>
      <th scope="col">Date de fin</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {listEducation.map((education, i) => <tr key={i}>
    
    <td data-label="Ecole">{education.name_school}</td>
    <td data-label="Diplome">{education.diplome}</td>
    <td data-label="Niveau">{education.title_diplome} {education.level_diplome} </td>
    <td data-label="Date de début">{displayDate(education.date_start_education)} </td>
    <td data-label="Date de fin">{displayDate(education.date_end_education)}</td>
    <td data-label="action"> <NavLink  to={"/admin/edit/education/"+education._id}><FontAwesomeIcon  icon={faEdit} /></NavLink> <NavLink  onClick={(e) =>{handleDeleteEducation(education._id)}}><FontAwesomeIcon  icon={faTrash} /></NavLink></td>

  </tr>)}   
  </tbody>
</table>
    </>
    )
}
export default Home;