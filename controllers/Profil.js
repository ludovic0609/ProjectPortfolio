import {Profil} from "../database.js";

import fs from "fs";
import formidable from "formidable";

// recupere le profil 
export function getProfil(req,res){
  Profil.find({},(err, profil) => {
    if(err) return console.error(err);
  res.json(profil);
});
}
// récupère un profil
export function GetProfilById(req,res){
  const id=req.params.id;
  Profil.find({_id:id},(err, profil) => {
      if(err) return console.error(err);
    res.json(profil);
  });
}

 // Recupere les données du formulaire en PUT, vérifie le formulaire et l'ajoute à la base de données
export function EditProfil(req,res){
  const id=req.params.id;
  let profil=null;

  const form = formidable();
  form.parse(req, function (err, fields, files){
   
      if(fields.civilite==="" || fields.firstname==="" || fields.lastname==="" || fields.description===""
       || fields.title===""  ){
          res.status(401).send({message:"un des champs n'a pas été renseigné."});
          return;
      }
      
      let rawDataPicture=null;
      let rawDataCV=null;
      let newpathPicture=null;
      let newpathCV=null;

      let oldpathPicture=null;
      let namefilePicture=null;
      let oldpathCV=null;
      let namefileCV=null;

      if(files.file_picture_profil){
        
        oldpathPicture = files.file_picture_profil.filepath;
        namefilePicture=fields.picture_profil;
        rawDataPicture = fs.readFileSync(oldpathPicture);
        newpathPicture = 'portfolio/public/uploads/profil/picture/'+namefilePicture;
      }

      if(files.file_cv){

        oldpathCV = files.file_cv.filepath;
        namefileCV=fields.cv_name;
        rawDataCV = fs.readFileSync(oldpathCV);
        newpathCV = 'portfolio/public/uploads/profil/cv/'+namefileCV;
      }
      
      if(rawDataPicture!=null && rawDataCV!=null) 
      {
       
        updateFilePicture(id,"",newpathPicture,rawDataPicture,namefilePicture);
        updateFileCV(id,"",newpathCV,rawDataCV,namefileCV);
      profil = 
          {
              civilite: fields.civilite,
              firstname: fields.firstname,
              lastname: fields.lastname,
              date_of_year: new Date(fields.date_of_year),
              title: fields.title,
              description:fields.description,
              my_situation:fields.my_situation,
              file_cv:namefileCV,
              adresse: fields.adresse,
              code_postal:fields.code_postal,
              commune:fields.commune,
              telephone:fields.telephone,
              date_update:new Date(),
              picture_profil:namefilePicture
          };
      }
      else if(rawDataPicture!=null  ){
      
        updateFilePicture(id,"",newpathPicture,rawDataPicture,namefilePicture);
        profil = 
          {
              civilite: fields.civilite,
              firstname: fields.firstname,
              lastname: fields.lastname,
              date_of_year: new Date(fields.date_of_year),
              title: fields.title,
              description:fields.description,
              my_situation:fields.my_situation,
              adresse: fields.adresse,
              code_postal:fields.code_postal,
              commune:fields.commune,
              telephone:fields.telephone,
              date_update:new Date(),
              picture_profil:namefilePicture
          };
    }
      else if(rawDataCV!=null){
        updateFileCV(id,"",newpathCV,rawDataCV,namefileCV);
        profil = 
          {
              civilite: fields.civilite,
              firstname: fields.firstname,
              lastname: fields.lastname,
              date_of_year: new Date(fields.date_of_year),
              title: fields.title,
              description:fields.description,
              my_situation:fields.my_situation,
              file_cv:namefileCV,
              adresse: fields.adresse,
              code_postal:fields.code_postal,
              commune:fields.commune,
              telephone:fields.telephone,
              date_update:new Date()
          };
      }
      else{
       
        profil = 
          {
              civilite: fields.civilite,
              firstname: fields.firstname,
              lastname: fields.lastname,
              date_of_year: new Date(fields.date_of_year),
              title: fields.title,
              description:fields.description,
              my_situation:fields.my_situation,
              adresse: fields.adresse,
              code_postal:fields.code_postal,
              commune:fields.commune,
              telephone:fields.telephone,
              date_update:new Date()
          };
          
}

      Profil.findOneAndUpdate({_id:id}, profil,function (error, success) {
      if (error) {
          console.log(error);
      } else {
            res.status(200).send(true);// renvoi true
      }
  });

  });
}
// met à jour le fichier de la photo de profil
function updateFilePicture(id,oldpath,newpath,rawData,namefile){
  const findFile=false;
  Profil.find({},(err, profil) => {
      if(err) return console.error(err);
      
          if(profil.picture_profil && profil.picture_profil==namefile){
              findFile=true;
          }

  });
  if(findFile==false){
        Profil.findOne({_id:id},(err, profil) => {
          if(err) return console.error(err);
          fs.writeFile(newpath, rawData, function (err){
              if (err) throw err;
              fs.unlink("portfolio/public/uploads/profil/picture/"+profil.picture_profil, (err => {
                  if (err) console.log(err);
                  
                }));
              }   );
        
      });
      
  }else{
      Profil.findOne({_id:id},(err, profil) => {
          if(err) return console.error(err);
          fs.writeFile(newpath, rawData, function (err){
              if (err) throw err;
              }   );
        
      });
  }
 
}
// met à jour le fichier du CV
function updateFileCV(id,oldpath,newpath,rawData,namefile){
  const findFile=false;
  Profil.find({},(err, profil) => {
      if(err) return console.error(err);
      
          if(profil.file_cv && profil.file_cv==namefile){
              findFile=true;
          }

  });
  if(findFile==false){
      Profil.findOne({_id:id},(err, profil) => {
          if(err) return console.error(err);
          fs.writeFile(newpath, rawData, function (err){
              if (err) throw err;
              fs.unlink("portfolio/public/uploads/profil/cv/"+profil.file_cv, (err => {
                  if (err) console.log(err);
                  
                }));
              }   );
      });
      
  }else{
      Project.findOne({_id:id},(err, profil) => {
          if(err) return console.error(err);
          fs.writeFile(newpath, rawData, function (err){
              if (err) throw err;
              }   );
        
      });
  }
 
}