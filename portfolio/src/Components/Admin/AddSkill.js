import NavAdmin from "./Nav";
import { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";
const Skill = () => {
    const navigate = useNavigate();
    const [listeCategory, setListCategory] = useState([]);
    const [skill, setSkill] = useState({name:"", description:"",level:"",stars :"",category:""});
    const [skillAdd,setSkillAdd] = useState(false);
    const[messageError,setMessageError]=useState("");
    
    useEffect(() => {
        fetch('http://localhost:8080/skill/category')
          .then(
            response => response.json())
          .then(res => {
            setListCategory(res);
          });
          
    
      }, []);

    const handleChange = (event)  => {
        event.preventDefault();
        const {name, value} = event.target;
        setSkill(oldUser => {
        return {
        ...skill,
        [name]: value,
      };
    });

    
}

const handleSubmit = (event) =>{
    event.preventDefault();
    if(skill.name===""|| skill.level==="" || skill.stars==="" || skill.category==="" ){
        setMessageError("un des champ n'a pas été renseigné.");
        setSkillAdd(false);
        return;
    }

    fetch('http://localhost:8080/skill/add', {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(skill)
          })
          .then((response) => {
            if (response.status===200) {
              return response.json();
            }
            
            throw new Error("un des champ n'a pas été renseigné.");
            

          })
          .then((result) => {
            setSkillAdd(true);
            if(result) navigate("/admin");
            
          })
          .catch((error)=>{
            
            setMessageError(error.toString());
            setSkillAdd(false);
          })
    
};

    return (
        <>
         <NavAdmin/>
        
        <div className="container_form">
            <form method="post" onSubmit={handleSubmit}>
              <fieldset className="container_fieldset">
                <legend className="container_legend">Ajouter une Compétence</legend>

                  <div className="container_label">
                    <label htmlFor="name">Nom <span className="required_input">*</span> :</label>
                  </div>

                  <div className="container_input">
                    <input type="text" required id="name" name="name" placeholder="Nom" onChange={handleChange}/>
                  </div>
                  <div className="container_label">
                    <label htmlFor="category">Catégorie <span className="required_input">*</span>  :</label>
                  </div>

                  <div className="container_input">
                    <select name="category" id="category" required onChange={handleChange}>
                        <option value="">Selectionnez...</option>
                        {listeCategory.map((cat, i) => <option value={cat._id} key={i}>{cat.name}</option>)}
                    </select>
                  </div>

                  <div className="container_label">
                    <label htmlFor="level">Niveau <span className="required_input">*</span> :</label>
                  </div>
                  <div className="container_input">
                    <input type="text"  id="level" name="level" required placeholder="(Débutant, intermédiaire...)"  onChange={handleChange}/>
                  </div>
                  <div className="container_label">
                    <label htmlFor="stars">Note sur 5 <span className="required_input">*</span> :</label>
                  </div>

                  <div className="container_input">
                    <input type="number" id="stars" required name="stars" placeholder="Note de 1 à 5"  onChange={handleChange}/>
                  </div>

                  <div className="container_label">
                    <label htmlFor="description">Description :</label>
                  </div>
                  <div className="container_input">
                    <textarea name="description" id="description" cols="30" rows="10" placeholder="Description de la compétence"  onChange={handleChange}></textarea>
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

export default Skill;