import NavAdmin from "./Nav";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
const Education = () => {
    const navigate = useNavigate();
    const [education, setEducation] = useState({name_school:"", city :"",country:"",diplome:"",title_diplome:"",
    level_diplome:"",website:"",description:"",date_start_education:"",date_end_education:""});
    const [educationAdd,setEducationAdd] = useState(false);
    const[messageError,setMessageError]=useState("");
  
    const handleChange = (event)  => {
        event.preventDefault();
        const {name, value} = event.target;
        setEducation(oldUser => {
        return {
        ...education,
        [name]: value,
      };
    });

    
}

const handleSubmit = (event) =>{
    event.preventDefault();
    if(education.name_school===""|| education.diplome==="" || education.title_diplome==="" 
    || education.date_start_education===""){
        setMessageError("un des champ n'a pas été renseigné.");
        setEducationAdd(false);
        return;
    }

    fetch('http://localhost:8080/education/add', {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(education)
          })
          .then((response) => {
            if (response.status===200) {
              return response.json();
            }
            
            throw new Error("un des champ n'a pas été renseigné.");
            

          })
          .then((result) => {
            setEducationAdd(true);
            if(result) navigate("/admin");
            
          })
          .catch((error)=>{
            
            setMessageError(error.toString());
            setEducationAdd(false);
          })
    

};

    return (
        <>
         <NavAdmin/>
        <div className="container_form">
            <form method="post" onSubmit={handleSubmit}>
              <fieldset className="container_fieldset">
                <legend className="container_legend">Ajouter un diplome/formation</legend>

                <div className="column">
                <div className="container_label">
                      <label htmlFor="date_start_education">Date de début <span className="required_input">*</span> :</label>
                    </div>

                    <div className="container_input">
                      <input type="date"  id="date_start_education" required name="date_start_education" onChange={handleChange}/>
                    </div>

                    <div className="container_label">
                      <label htmlFor="date_end_education">Date de fin :</label>
                    </div>

                    <div className="container_input">
                      <input type="date"  id="date_end_education" name="date_end_education" onChange={handleChange}/>
                    </div>



                    <div className="container_label">
                      <label htmlFor="name_school">Nom de l'école <span className="required_input">*</span> :</label>
                    </div>

                    <div className="container_input">
                      <input type="text" required id="name_school" name="name_school" onChange={handleChange}/>
                    </div>

                    <div className="container_label">
                      <label htmlFor="country">Pays :</label>
                    </div>

                    <div className="container_input">
                      <input type="text" id="country" name="country" onChange={handleChange}/>
                    </div>

                    <div className="container_label">
                      <label htmlFor="city">Ville :</label>
                    </div>

                    <div className="container_input">
                      <input type="text" id="city" name="city" onChange={handleChange}/>
                    </div>
                  </div>

                  <div className="column">
                    <div className="container_label">
                      <label htmlFor="diplome">Diplome/Formation <span className="required_input">*</span>:</label>
                    </div>

                    <div className="container_input">
                    <input type="text" required id="diplome" name="diplome" onChange={handleChange}/>
                    </div>
                    <div className="container_label">
                      <label htmlFor="title_diplome">Titre du Diplome/Formation <span className="required_input">*</span> :</label>
                    </div>

                    <div className="container_input">
                      <input type="text" required id="title_diplome" name="title_diplome" onChange={handleChange}/>
                    </div>

                    <div className="container_label">
                      <label htmlFor="level_diplome">Niveau du Diplome/Formation :</label>
                    </div>

                    <div className="container_input">
                      <input type="text" required id="level_diplome" name="level_diplome" onChange={handleChange}/>
                    </div>

                    <div className="container_label">
                      <label htmlFor="website">Site Web :</label>
                    </div>

                    <div className="container_input">
                      <input type="text"  id="website" name="website" onChange={handleChange}/>
                    </div>
                  
                    <div className="container_label">
                      <label htmlFor="description">Description :</label>
                    </div>

                    <div className="container_input">
                      <textarea name="description" id="description" cols="30" rows="10" onChange={handleChange}></textarea>
                    </div>

                    
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

export default Education;