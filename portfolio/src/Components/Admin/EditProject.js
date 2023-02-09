import NavAdmin from "./Nav";
import ImageProject from "./ImageProject";
import { useState,useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";


const Project = () => {
    const navigate = useNavigate();
    const [listeCategory, setListCategory] = useState([]);
    const [project, setProject] = useState({title:"", description:"",category:"",website:""});
    const [image, setImage] = useState({ preview: '', data: '' });

    const [OneRessource,setOneRessource] = useState("");
    const [ressource,setRessource] = useState([]);
    
    const [changePicture,setChangePicture] = useState(false);

    const [filename, setFileName] = useState("");
    const [projectUpdate,setProjectUpdate] = useState(false);
    const[messageError,setMessageError]=useState("");

    const {id} =useParams();

    const url_fetch="http://localhost:8080/project/"+id;

    useEffect(() => {
        fetch('http://localhost:8080/project/category')
          .then(
            response => response.json())
          .then(res => {
            setListCategory(res);
          });

          fetch(url_fetch)
          .then(
            response => response.json())
          .then(res => {
            setProject(res[0]);
            setFileName(res[0].image_project);
            setRessource(res[0].ressources);
          });
          
    
      }, []);

      useEffect(() => {
        if(projectUpdate) navigate("/admin");
        
          
      }, [projectUpdate]);



    const handleChange = (event)  => {
        event.preventDefault();
        const {name, value} = event.target;
        setProject(oldUser => {
        return {
        ...project,
        [name]: value,
      };
    });
};

const handleChangeRessource = (event)  => {
  event.preventDefault();
  const {name, value} = event.target;
  setOneRessource(value);
};

const handleChangeOneRessourceEdit = (event,i)  => {
  event.preventDefault();
  const {name, value} = event.target;
  const newRessourceList=[...ressource];
  newRessourceList[i]=value;
  setRessource(newRessourceList);
};

const handleClickRessource = (event)  => {

  event.preventDefault();
  if(OneRessource===""){
    setMessageError("la ressource est vide");
    return;
  }
  ressource.push(OneRessource);
  setOneRessource("");
};

const handleClickDeleteRessource = (event)  => {
  ressource.splice(event,1);
  const newRessource=[...ressource];
  setRessource(newRessource);
};

const handleClickEditRessource = (event)  => {
  const nameEvent="ressource["+event+"]";
  const  inputressource=document.getElementsByName(nameEvent);
  inputressource[0].disabled=false;

};

const handleChangePicture = (event)  => {
  
  const img = {
    preview: URL.createObjectURL(event.target.files[0]),
    data: event.target.files[0],
  }
  setImage(img);
  setFileName(img.data.name);
  setChangePicture(true);

    
};



const handleSubmit = (event) =>{
    event.preventDefault();
    
    if(project.title===""|| project.description==="" || project.category==="" ){
        setMessageError("un des champ n'a pas été renseigné.");
        setProjectUpdate(false);
        return;
    }

    let formData = new FormData();
    formData.append('file_project', image.data);
    formData.append('image_project', filename);
    formData.append('ressource', JSON.stringify(ressource));
    formData.append("title",project.title);
    formData.append("description",project.description);
    formData.append("category",project.category);
    formData.append("website",project.website);

    fetch('http://localhost:8080/project/edit/'+id, {
    method: "PUT",
    body:formData
      
    })
    .then((response) => {
      if (response.status===200) {
        return response.json();
      }
      
      throw new Error("un des champ n'a pas été renseigné.");
      

    })
    .then((result) => {  

          if(result) setProjectUpdate(true);       
    })
    .catch((error)=>{
            
      setMessageError(error.toString());
      setProjectUpdate(false);
    })
};

    return (
        <>
         <NavAdmin/>
        <div className="container_form">
            <form method="post" onSubmit={handleSubmit}>
              <fieldset className="container_fieldset">
                <legend className="container_legend">Editer un Projet</legend>

                <div className="container_label">
                  <ImageProject filename={filename} image={image.preview} changePicture={changePicture} title={project.title}/>
                </div>

                <div className="container_upload_file">
                  <input type="file" id="upload_file" name="upload_file" accept="image/*" onChange={handleChangePicture}/>
                </div>

                <div className="container_label">
                  <label htmlFor="title">Titre du projet <span className="required_input">*</span> :</label>
                </div>

                <div className="container_input">
                  <input type="text" required id="title" name="title" value={project.title} onChange={handleChange}/>
                </div>

                <div className="container_label">
                  <label htmlFor="category">Catégorie <span className="required_input">*</span>  :</label>
                </div>

                <div className="container_input">
                  <select name="category" id="category" required value={project.category} onChange={handleChange}>
                      <option value="">Selectionnez...</option>
                      {listeCategory.map((cat, i) => <option value={cat._id} key={i}>{cat.name}</option>)}
                  </select>
                </div>

                <div className="container_label">
                  <label htmlFor="website">Site du projet :</label>
                </div>

                <div className="container_input">
                  <input type="text" required id="website" name="website" value={project.website} onChange={handleChange}/>
                </div>

                <div className="container_label">
                  <label htmlFor="description">Description <span className="required_input">*</span> :</label>
                </div>

                <div className="container_input">
                  <textarea name="description" id="description" required cols="30" rows="10" value={project.description} onChange={handleChange}></textarea>
                </div>

                <div className="container_label">
                  <label htmlFor="city">Ajouter une ressource :</label>
                </div>

                <div className="container_input">
                  <input type="text" id="ressource" name="ressource" value={OneRessource} onChange={handleChangeRessource}/>
                  <input type="button" value="Ajouter" onClick={handleClickRessource} />
                </div>

                <div className="container_label">
                  <label htmlFor="list_ressource">Liste des ressources  :</label>
                  {ressource.map((res, i) => <ul key={i}>
        
                  <li><input type="text" name={"ressource["+i+"]"} value={res} disabled onChange={(e) =>{handleChangeOneRessourceEdit(e,i)}}/>
                  <input type="button"  value="delete" onClick={(e) =>{handleClickDeleteRessource(i)}}/>
                  <input type="button" value="edit" onClick={(e) =>{handleClickEditRessource(i)}}/></li>
                </ul>)}   
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

export default Project;