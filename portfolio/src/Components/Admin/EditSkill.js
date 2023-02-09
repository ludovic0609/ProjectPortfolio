import NavAdmin from "./Nav";
import { useState,useEffect } from "react";

import { useNavigate,useParams } from "react-router-dom";
const Skill = () => {
    const navigate = useNavigate();
    const [listCategory, setListCategory] = useState([]);
    const [skill, setSkill] = useState({name:"", description:"",level:"",stars :"",category:""});
    const [skillUpdate,setSkillUpdate] = useState(false);
    const[messageError,setMessageError]=useState("");
    

    const {id} =useParams();

    const url_fetch="http://localhost:8080/skill/"+id;

    useEffect(() => {

        fetch('http://localhost:8080/skill/category')
          .then(
            response => response.json())
          .then(res => {
            setListCategory(res);
          });

        fetch(url_fetch)
          .then(
            response => response.json())
          .then(res => {
            setSkill(res[0]);
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
        setSkillUpdate(false);
        return;
    }

    fetch('http://localhost:8080/skill/edit/'+id, {
            method: "PUT",
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
            setSkillUpdate(true);
            if(result) navigate("/admin");
            
          })
          .catch((error)=>{
            
            setMessageError(error.toString());
            setSkillUpdate(false);
          })
};

    return (
        <>
         <NavAdmin/>
    
        <div className="container_form">
            <form method="post" onSubmit={handleSubmit}>
              <fieldset className="container_fieldset">
                  <legend className="container_legend">Modifier une Compétence</legend>

                  <div className="container_label">
                    <label htmlFor="name">Nom <span className="required_input">*</span> :</label>
                  </div>

                  <div className="container_input">
                    <input type="text" required id="name" name="name" value={skill.name} onChange={handleChange}/>
                  </div>

                  <div className="container_label">
                    <label htmlFor="category">Catégorie <span className="required_input">*</span>  :</label>
                  </div>

                  <div className="container_input">
                    <select name="category" id="category" required value={skill.category} onChange={handleChange}>
                        <option value="">Selectionnez...</option>
                        {listCategory.map((cat, i) => <option value={cat._id} key={i}>{cat.name}</option>)}
                    </select>
                  </div>

                  <div className="container_label">
                    <label htmlFor="level">Niveau <span className="required_input">*</span> :</label>
                  </div>

                  <div className="container_input">
                    <input type="text"  id="level" name="level" required value={skill.level}  onChange={handleChange}/>
                  </div>

                  <div className="container_label">
                    <label htmlFor="stars">Note sur 5 <span className="required_input">*</span> :</label>
                  </div>

                  <div className="container_input">
                    <input type="number" id="stars" name="stars" required value={skill.stars}  onChange={handleChange}/>
                  </div>
                  
                  <div className="container_label">
                    <label htmlFor="description">Description :</label>
                  </div>
                  
                  <div className="container_input">
                    <textarea name="description" id="description" value={skill.description}  cols="30" rows="10" onChange={handleChange}></textarea>
                  </div>

                  <div className="container_label_error">
                    <label>{messageError}</label>
                  </div>

                  <input type="submit" value="Enregistrer" className="container_form_submit"/>
                </fieldset>
            </form>
        </div>
        </>
    );
};

export default Skill;