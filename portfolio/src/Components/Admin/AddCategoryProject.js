import NavAdmin from "./Nav";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
const CategoryProject = () => {
    const navigate = useNavigate();
    const [categoryProject, setCategoryProject] = useState({name:"", description :""});
    const [categoryAdd,setCategoryAdd] = useState(false);
    const [nameCategoryProjectExist,setNameCategoryProjectExist]=useState(false);
    const[messageError,setMessageError]=useState("");
    
    const handleChange = (event)  => {
        event.preventDefault();
        const {name, value} = event.target;
        setCategoryProject(oldUser => {
        return {
        ...categoryProject,
        [name]: value,
      };
    });
    
}
const handleSubmit = (event) =>{
    
    event.preventDefault();

    if(categoryProject.category===""|| categoryProject.description===""){
        setMessageError("un des champ n'a pas été renseigné.");
        setCategoryAdd(false);
        return;
    }

   
 
        fetch('http://localhost:8080/project/category/add', {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(categoryProject)
          })

          .then((response) => {
            if (response.status===200) {
              return response.json();
            }
            else if (response.status===500) {
                setNameCategoryProjectExist(true);
                throw new Error("le nom de la catégorie existe déjà.");
                
            }else{
                throw new Error("un des champ n'a pas été renseigné.");
            }

          })
          .then((result) => {
            if(result) { 
                setCategoryAdd(true);
                navigate("/admin/category");
            }
          })
          .catch((error)=>{
            
            setMessageError(error.toString());
            setCategoryAdd(false);
          })
    

};

    return (
        <>
         <NavAdmin/>
         
        <div className="container_form">
            <form method="post" onSubmit={handleSubmit}>
            <fieldset className="container_fieldset">
                
                <legend className="container_legend">Ajouter une Catégorie</legend>
                <div className="container_label">
                    <label htmlFor="name">Nom de la Catégorie <span className="required_input">*</span> :</label>
                </div>
                <div className="container_input">
                    <input type="text" required id="name" name="name" placeholder="Nom de la Catégorie" onChange={handleChange}/>
                </div>

                <div className="container_label">
                    <label htmlFor="description">Description <span className="required_input">*</span> :</label>
                </div>
                <div className="container_input">
                    <textarea name="description" id="description" required  cols="30" rows="10" placeholder="Description de la Catégorie" onChange={handleChange}></textarea>
                </div>
                
                <div className="container_label_error">
                    <label>{messageError}</label>
                </div>
                
                <input type="submit" value="Ajouter" className="container_form_submit"/>
                </fieldset>
            </form>
        </div>
        </>
    );
};

export default CategoryProject;