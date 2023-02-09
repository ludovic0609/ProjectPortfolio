//import le model WorkExperience
import {WorkExperience} from "../database.js";

// récupère toutes les expériences pro
export function GetAllWorkExperience(req,res){
    WorkExperience.find({},(err, workexperiences) => {
        if(err) return console.error(err);
      res.json(workexperiences);
    });
}

// récupère toutes les expériences pro classé du plus recent au plus ancien
export function GetAllWorkExperienceOrderByDate(req,res){
    WorkExperience.aggregate([
        {
            $sort: { date_start_work: -1 }
        }],(err, workexperience) => {
          if(err) return console.error(err);
        res.json(workexperience);
      });
}



// récupère une expérience pro
export function GetWorkExperienceById(req,res){
    const id=req.params.id;
    WorkExperience.find({_id:id},(err, workexperience) => {
        if(err) return console.error(err);
      res.json(workexperience);
    });
}

// Supprimer une expérience pro
export function DeleteWorkExperience(req,res){
    const id=req.params.id;
    WorkExperience.deleteOne({_id:id},(err, workexperience) => {
        if(err) return console.error(err);
        res.send(true);
    });
}

 // Recupere les données du formulaire en POST, vérifie le formulaire et l'ajoute à la base de données

 export function AddWorkExperience(req,res){
    let workexperience=null;
    let tasks=[];
    const reqTasks=req.body.task;
    if(req.body.workexperience.title_job==="" || req.body.workexperience.name_company==="" 
    || req.body.workexperience.description==="" || req.body.date_start_work===""){
            res.status(401).send({message:"un des champs n'a pas été renseigné."});
            return;
    }
    if(reqTasks.length>0){
        for(let i=0;i<reqTasks.length;i++){
            if(reqTasks[i]!==""){
                tasks.push(reqTasks[i]);
            }
        }
    }
    workexperience={
            title_job:req.body.workexperience.title_job,
            name_company:req.body.workexperience.name_company,
            website:req.body.workexperience.website,
            country:req.body.workexperience.country,
            city:req.body.workexperience.city,
            description:req.body.workexperience.description,
            date_start_work:new Date(req.body.workexperience.date_start_work),
            date_end_work:new Date(req.body.workexperience.date_end_work),
            date_create:new Date(),
            date_update:new Date(),
            tasks:tasks
    }

    let new_workexperience = new WorkExperience(workexperience);
    new_workexperience.save(function (err, workexperience) {
    if (err) return console.error(err);
        res.status(200).send(true);
    });
  }

   // Recupere les données du formulaire en PUT, vérifie le formulaire et met à jour la base de données
  export function EditWorkExperience(req,res){
    const id=req.params.id;
    let workexperience=null;
    let tasks=[];
    const reqTasks=req.body.task;
    if(req.body.workexperience.title_job==="" || req.body.workexperience.name_company==="" 
    || req.body.workexperience.description==="" || req.body.date_start_work===""){
            res.status(401).send({message:"un des champs n'a pas été renseigné."});
            return;
    }
    if(reqTasks.length>0){
        for(let i=0;i<reqTasks.length;i++){
            if(reqTasks[i]!==""){
                tasks.push(reqTasks[i]);
            }
        }
    }
    workexperience={
        title_job:req.body.workexperience.title_job,
        name_company:req.body.workexperience.name_company,
        website:req.body.workexperience.website,
        country:req.body.workexperience.country,
        city:req.body.workexperience.city,
        description:req.body.workexperience.description,
        date_start_work:new Date(req.body.workexperience.date_start_work),
        date_end_work:new Date(req.body.workexperience.date_end_work),
        date_update:new Date(),
        tasks:tasks
    }
    
    WorkExperience.findOneAndUpdate({_id:id}, workexperience,function (error, success) {
      if (error) {
          console.log(error);
      } else {
            res.status(200).send(true);
      }
  });
  }