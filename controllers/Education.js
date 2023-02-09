//import le model Education
import {Education} from "../database.js";

// récupère tout les diplomes/formations
export function GetAllEducation(req,res){
    Education.find({},(err, educations) => {
        if(err) return console.error(err);
      res.json(educations);
    });
  }

  // récupère tout les diplomes/formations classé du plus recent au plus ancien
export function GetAllEducationOrderByDate(req,res){
  Education.aggregate([
      {
          $sort: { date_start_education: -1 }
      }],(err, educations) => {
        if(err) return console.error(err);
      res.json(educations);
    });
}

// récupère un diplome/formation
export function GetEducationById(req,res){
    const id=req.params.id;
    Education.find({_id:id},(err, education) => {
        if(err) return console.error(err);
      res.json(education);
    });
  }

   // Supprimer un  diplome/formation
export function DeleteEducation(req,res){
    const id=req.params.id;
    Education.deleteOne({_id:id},(err, education) => {
        if(err) return console.error(err);
        res.send(true);
    });
  }

  // Recupere les données du formulaire en POST, vérifie le formulaire et l'ajoute à la base de donnée

export function AddEducation(req,res){
    let education=null;
    if(req.body.name_school==="" || req.body.diplome==="" || req.body.title_diplome===""
    || req.body.date_start_education===""){
            res.status(401).send({message:"un des champs n'a pas été renseigné."});
            return;
    }
    education={
            name_school:req.body.name_school,
            country:req.body.country,
            city:req.body.city,
            diplome:req.body.diplome,
            title_diplome:req.body.title_diplome,
            level_diplome:req.body.level_diplome,
            website:req.body.website,
            description:req.body.description,
            date_start_education:new Date(req.body.date_start_education),
            date_end_education:new Date(req.body.date_end_education),
            date_create:new Date(),
            date_update:new Date()
    }

    let new_education = new Education(education);
    new_education.save(function (err, education) {
    if (err) return console.error(err);
        res.status(200).send(true);
    });
  }


  // Recupere les données du formulaire en PUT, vérifie le formulaire et modifie en base de donnée

export function EditEducation(req,res){
  const id=req.params.id;
  let education=null;
  if(req.body.name_school==="" || req.body.diplome==="" || req.body.title_diplome===""
  || req.body.date_start_education===""){
          res.status(401).send({message:"un des champs n'a pas été renseigné."});
          return;
  }
  education={
          name_school:req.body.name_school,
          country:req.body.country,
          city:req.body.city,
          diplome:req.body.diplome,
          title_diplome:req.body.title_diplome,
          level_diplome:req.body.level_diplome,
          website:req.body.website,
          description:req.body.description,
          date_start_education:new Date(req.body.date_start_education),
          date_end_education:new Date(req.body.date_end_education),
          date_update:new Date()
  }
  
  Education.findOneAndUpdate({_id:id}, education,function (error, success) {
    if (error) {
        console.log(error);
    } else {
        res.status(200).send(true);
    }
});
}