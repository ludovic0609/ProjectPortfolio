import NavAdmin from "./Nav";
import ImageProfil from "./ImageProfil";
import { useState,useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";


const Profil = () => {
    const navigate = useNavigate();
    const [profil, setProfil] = useState({civilite:"", firstname:"",lastname:"",date_of_year:"",
    title:"",description:"",my_situation:"",adresse:"",code_postal:"",commune:"",telephone:""});
    const [imageProfil, setImageProfil] = useState({ preview: '', data: '' });
    const [fileCV, setFileCV] = useState({ preview: '', data: '' });

    const [filenamePicture, setFileNamePicture] = useState("");
    const [filenameCV, setFileNameCV] = useState("");

    const [changePicture,setChangePicture] = useState(false);

    const [profilUpdate,setProfilUpdate] = useState(false);
    const[messageError,setMessageError]=useState("");

    const {id} =useParams();

    const url_fetch="http://localhost:8080/edit/profil/"+id;

    useEffect(() => {
          fetch(url_fetch)
          .then(
            response => response.json())
          .then(res => {
            setProfil(res[0]);
            setFileNamePicture(res[0].picture_profil);
            setFileNameCV(res[0].file_cv);
          });
          
    
      }, []);

      useEffect(() => {
        if(profilUpdate) navigate("/admin");
        
          
      }, [profilUpdate]);



    const handleChange = (event)  => {
        event.preventDefault();
        const {name, value} = event.target;
        setProfil(oldUser => {
        return {
        ...profil,
        [name]: value,
      };
    });
};

const handleChangePicture = (event)  => {
  
  const img = {
    preview: URL.createObjectURL(event.target.files[0]),
    data: event.target.files[0],
  }
  setImageProfil(img);
  setFileNamePicture(img.data.name);
  setChangePicture(true);
    
};

const handleChangeCV = (event)  => {
  
    const cv = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    }
    setFileCV(cv);
    setFileNameCV(cv.data.name);
      
  };

const handleSubmit = (event) =>{
    event.preventDefault();
    
    if(profil.civilite==="" || profil.firstname===""|| profil.lastname==="" || profil.description==="" || profil.title===""  ){
        setMessageError("un des champ n'a pas été renseigné.");
        setProfilUpdate(false);
        return;
    }

    let formData = new FormData();

    formData.append('file_picture_profil', imageProfil.data);
    formData.append('picture_profil', filenamePicture);
    formData.append('file_cv', fileCV.data);
    formData.append('cv_name', filenameCV);

    formData.append("civilite",profil.civilite);
    formData.append("firstname",profil.firstname);
    formData.append("lastname",profil.lastname);
    formData.append("date_of_year",profil.date_of_year);
    formData.append("title",profil.title);
    formData.append("description",profil.description);
    formData.append("my_situation",profil.my_situation);
    formData.append("adresse",profil.adresse);
    formData.append("code_postal",profil.code_postal);
    formData.append("commune",profil.commune);
    formData.append("telephone",profil.telephone);

    fetch('http://localhost:8080/profil/edit/'+id, {
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

          if(result) setProfilUpdate(true);       
    })

    .catch((error)=>{
            
      setMessageError(error.toString());
      setProfilUpdate(false);
    })
};

    return (
        <>
         <NavAdmin/>
        <div className="container_form">
            <form method="post" onSubmit={handleSubmit}>
              <fieldset className="container_fieldset">
                <legend className="container_legend">Editer mon Profil</legend>

                <div className="container_label">
                  <ImageProfil filename={filenamePicture} image={imageProfil.preview} changePicture={changePicture}  title={profil.lastname+" "+profil.firstname}/>
                </div>

                <div className="container_upload_file">
                  <input type="file" id="upload_file" name="upload_file" accept="image/*" onChange={handleChangePicture}/>
                </div>

                <div className="container_label">
                  <label htmlFor="upload_file">Fichier CV :</label>
                </div>

                <div className="container_upload_file">
                  <input type="file" id="upload_file" name="upload_file" accept="application/msword,application/pdf" onChange={handleChangeCV}/>
                </div>

                <div className="column">

                    <div className="container_label">
                      <label htmlFor="civilite">Civilité <span className="required_input">*</span>  :</label>
                    </div>

                    <div className="container_input">
                      <select name="civilite" id="civilite" required value={profil.civilite} onChange={handleChange}>
                          <option value="">Selectionnez...</option>
                          <option value="M.">M.</option>
                          <option value="Mme">Mme</option>
                      </select>
                    </div>
                    
                    <div className="container_label">
                     <label htmlFor="lastname">Nom <span className="required_input">*</span> :</label>
                    </div>

                    <div className="container_input">
                      <input type="text" required id="lastname" name="lastname" value={profil.lastname} onChange={handleChange}/>
                    </div>

                    <div className="container_label">
                      <label htmlFor="firstname">Prénom <span className="required_input">*</span> :</label>
                    </div>

                    <div className="container_input">
                      <input type="text" required id="firstname" name="firstname" value={profil.firstname} onChange={handleChange}/>
                    </div>

                    <div className="container_label">
                      <label htmlFor="date_of_year">Date de naissance :</label>
                    </div>

                    <div className="container_input">
                      <input type="date"  id="date_of_year" name="date_of_year"  value={profil.date_of_year.substring(0, 10)}  onChange={handleChange}/>
                    </div>

                    <div className="container_label">
                      <label htmlFor="title">Titre <span className="required_input">*</span> :</label>
                    </div>

                    <div className="container_input">
                      <input type="text" required id="title" name="title" value={profil.title} onChange={handleChange}/>
                    </div>

                    <div className="container_label">
                      <label htmlFor="my_situation">Ma Situation :</label>
                    </div>

                    <div className="container_input">
                      <input type="text" id="my_situation" name="my_situation" value={profil.my_situation} onChange={handleChange}/>
                    </div>

                </div>


                <div className="column">

                    <div className="container_label">
                      <label htmlFor="adresse">Adresse :</label>
                    </div>

                    <div className="container_input">
                      <input type="text" id="adresse" name="adresse" value={profil.adresse} onChange={handleChange}/>
                    </div>

                    <div className="container_label">
                      <label htmlFor="commune">Commune :</label>
                    </div>

                    <div className="container_input">
                      <input type="text"  id="commune" name="commune" value={profil.commune} onChange={handleChange}/>
                    </div>

                    <div className="container_label">
                      <label htmlFor="code_postal">Code postal :</label>
                    </div>

                    <div className="container_input">
                      <input type="text"  id="code_postal" name="code_postal" value={profil.code_postal} onChange={handleChange}/>
                    </div>

                    <div className="container_label">
                      <label htmlFor="telephone">Téléphone :</label>
                    </div>

                    <div className="container_input">
                      <input type="text" required id="telephone" name="telephone" value={profil.telephone} onChange={handleChange}/>
                    </div>

                    <div className="container_label">
                      <label htmlFor="description">Description <span className="required_input">*</span> :</label>
                    </div>

                    <div className="container_input">
                      <textarea name="description" id="description" required cols="30" rows="10" value={profil.description} onChange={handleChange}></textarea>
                    </div>
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

export default Profil;