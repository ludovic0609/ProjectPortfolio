import NavAdmin from "./Nav";
import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";



const Category = () => {
    const [listCategorySkill, setListCategorySkill] = useState([]);
    const [listCategoryProject, setListCategoryProject] = useState([]);

    const [removeCategorySkill, setRemoveCategorySkill] = useState(false);
    const [removeCategoryProject, setRemoveCategoryProject] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/skill/category')
          .then(
            response => response.json())
          .then(res => {
        
            setListCategorySkill(res);
            
           
          });

          fetch('http://localhost:8080/project/category')
          .then(
            response => response.json())
          .then(res => {
        
            setListCategoryProject(res);
            
           
          });
    
      }, []);

      useEffect(() => {
        fetch('http://localhost:8080/skill/category')
          .then(
            response => response.json())
          .then(res => {
        
            setListCategorySkill(res);
            
           
          });

      }, [removeCategorySkill,listCategorySkill]);

      useEffect(() => {
        fetch('http://localhost:8080/project/category')
          .then(
            response => response.json())
          .then(res => {
        
            setListCategoryProject(res);
            
           
          });

      }, [removeCategoryProject,listCategoryProject]);


      const handleDeleteSkill = (event) =>{
        const id_category=event;

        fetch('http://localhost:8080/delete/skill/category/'+id_category, {
                method: "DELETE",
                headers: {
                    'Content-type': 'text/html'
                  },
                  body: ""
              })
              .then((response) => response.json())
              .then((result) => {

                if(result) setRemoveCategorySkill(true);
                
                
              })

    };

    const handleDeleteProject = (event) =>{
        const id_category=event;

        fetch('http://localhost:8080/delete/project/category/'+id_category, {
                method: "DELETE",
                headers: {
                    'Content-type': 'text/html'
                  },
                  body: ""
              })
              .then((response) => response.json())
              .then((result) => {

                if(result) setRemoveCategoryProject(true);
                
                
              })

    };
      
    return (
        <>
        <NavAdmin/>

          <label className="label_dashboard">Catégories d'une compétence <NavLink  to="/admin/add/skill/category"><FontAwesomeIcon className='add-icon' icon={faCirclePlus} title="Ajouter une catégorie"/></NavLink></label>
        <table>
  <thead>
    <tr>
    <th scope="col">Id</th>
      <th scope="col">Nom</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {listCategorySkill.map((cat, i) => <tr key={i}>
    
        <td data-label="Id">{cat._id}</td>
        <td data-label="Catégorie">{cat.name}</td>
        <td data-label="Description">{cat.description}</td>
        <td data-label="action"> <NavLink  to={"/admin/edit/skill/category/"+cat._id}><FontAwesomeIcon  icon={faEdit} /></NavLink> <NavLink  onClick={(e) =>{handleDeleteSkill(cat._id)}}><FontAwesomeIcon  icon={faTrash} /></NavLink></td>
  
      </tr>)}   
  </tbody>
</table>

<label className="label_dashboard">Catégories d'un projet <NavLink  to="/admin/add/project/category"><FontAwesomeIcon className='add-icon' icon={faCirclePlus} title="Ajouter une catégorie"/></NavLink></label>
<table>
  <thead>
    <tr>
        <th scope="col">Id</th>
        <th scope="col">Nom</th>
        <th scope="col">Description</th>
        <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {listCategoryProject.map((cat, i) => <tr key={i}>
    
    <td data-label="Id">{cat._id}</td>
    <td data-label="Catégorie">{cat.name}</td>
    <td data-label="Description">{cat.description}</td>
    <td data-label="action"> <NavLink  to={"/admin/edit/project/category/"+cat._id}><FontAwesomeIcon  icon={faEdit} /></NavLink> <NavLink  onClick={(e) =>{handleDeleteProject(cat._id)}}><FontAwesomeIcon  icon={faTrash} /></NavLink></td>

  </tr>)}   
  </tbody>
</table>

    </>
    )
}
export default Category;