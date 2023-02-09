import NavAdmin from "./Nav";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
const WorkExperience = () => {
    const navigate = useNavigate();
    const [workexperience, setWorkExperience] = useState({title_job:"", name_company:"",website:"",city :"",country:"",
    description:"",date_start_work:"",date_end_work:""});

    const [Onetask,setOneTask] = useState("");
    const [task,setTask] = useState([]);
    const [workexperienceAdd,setWorkExperienceAdd] = useState(false);
    const[messageError,setMessageError]=useState("");
    

    const handleChange = (event)  => {
        event.preventDefault();
        const {name, value} = event.target;
        setWorkExperience(oldUser => {
        return {
        ...workexperience,
        [name]: value,
      };
    });
};
const handleChangeTask = (event)  => {
  event.preventDefault();
  const {name, value} = event.target;
  setOneTask(value);
};

const handleChangeOneTaskEdit = (event,i)  => {
  event.preventDefault();
  const {name, value} = event.target;
  const newTaskList=[...task];
  newTaskList[i]=value;
  setTask(newTaskList);
};

const handleClickTask = (event)  => {

  event.preventDefault();
  if(Onetask===""){
    setMessageError("la tache est vide");
    return;
  }
  task.push(Onetask);
  setOneTask("");
};

const handleClickDeleteTask = (event)  => {
  task.splice(event,1);
  const newTaskList=[...task];
  setTask(newTaskList);
};

const handleClickEditTask = (event)  => {
  const nameEvent="task["+event+"]";
  const  inputtask=document.getElementsByName(nameEvent);
  inputtask[0].disabled=false;


};


const handleSubmit = (event) =>{
    event.preventDefault();
    if(workexperience.title_job===""|| workexperience.name_company==="" || workexperience.description===""
    || workexperience.date_start_work===""){
        setMessageError("un des champ n'a pas été renseigné.");
        setWorkExperienceAdd(false);
        return;
    }

    fetch('http://localhost:8080/workexperience/add', {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({workexperience,task})
          })
          .then((response) => {
            if (response.status===200) {
              return response.json();
            }
            
            throw new Error("un des champ n'a pas été renseigné.");
            
          })
          .then((result) => {
            setWorkExperienceAdd(true);
            if(result) navigate("/admin");
            
          })
          .catch((error)=>{
            
            setMessageError(error.toString());
            setWorkExperienceAdd(false);
          })
};

    return (
        <>
         <NavAdmin/>
        <div className="container_form">
            <form method="post" onSubmit={handleSubmit}>
              <fieldset className="container_fieldset">
                <legend className="container_legend">Ajouter une Expérience professionnelle</legend>

                <div className="column">
                <div className="container_label">
                  <label htmlFor="date_start_work">Date de début <span className="required_input">*</span> :</label>
                </div>

                <div className="container_input">
                  <input type="date" required  id="date_start_work" name="date_start_work" onChange={handleChange}/>
                </div>

                <div className="container_label">
                  <label htmlFor="date_end_work">Date de fin :</label>
                </div>

                <div className="container_input">
                  <input type="date"  id="date_end_work" name="date_end_work" onChange={handleChange}/>
                </div>
                
                <div className="container_label">
                  <label htmlFor="name_company">Nom de l'entreprise <span className="required_input">*</span> :</label>
                </div>

                <div className="container_input">
                  <input type="text" required id="name_company" name="name_company" onChange={handleChange}/>
                </div>

                <div className="container_label">
                  <label htmlFor="title_job">Titre du job <span className="required_input">*</span> :</label>
                </div>

                <div className="container_input">
                  <input type="text" required id="title_job" name="title_job" onChange={handleChange}/>
                </div>

                <div className="container_label">
                  <label htmlFor="website">Site Web :</label>
                </div>

                <div className="container_input">
                  <input type="text"  id="website" name="website" onChange={handleChange}/>
                </div>

                </div>


                <div className="column">

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

                <div className="container_label">
                  <label htmlFor="description">Description <span className="required_input">*</span> :</label>
                </div>

                <div className="container_input">
                  <textarea name="description" id="description" required cols="30" rows="10" onChange={handleChange}></textarea>
                </div>

                </div>
                
                
                <div className="container_label">
                  <label htmlFor="city">Ajouter une tache :</label>
                </div>
                <div className="container_input">
                  <input type="text" id="task" name="task" value={Onetask} onChange={handleChangeTask}/>
                  <input type="button" value="Ajouter" onClick={handleClickTask} />
                </div>
                <div className="container_label">
                <label htmlFor="list_task">Liste des taches  :</label>
                  {task.map((t, i) => <ul key={i}>
        
                  <li><input type="text" name={"task["+i+"]"} value={t} disabled onChange={(e) =>{handleChangeOneTaskEdit(e,i)}}/>
                  <input type="button"  value="delete" onClick={(e) =>{handleClickDeleteTask(i)}}/>
                  <input type="button" value="edit" onClick={(e) =>{handleClickEditTask(i)}}/></li>
                </ul>)}   
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

export default WorkExperience;