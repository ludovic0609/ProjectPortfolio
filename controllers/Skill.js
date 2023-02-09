//import le model Skill
import {Skill} from "../database.js";

// récupère toutes les compétences
export function GetAllSkill(req,res){
    Skill.find({},(err, skills) => {
        if(err) return console.error(err);
      res.json(skills);
    });
}

// récupère une compétence
export function GetSkillById(req,res){
    const id=req.params.id;
    Skill.find({_id:id},(err, skill) => {
        if(err) return console.error(err);
      res.json(skill);
    });
}

// Supprimer une Compétence
export function DeleteSkill(req,res){
    const id=req.params.id;
    Skill.deleteOne({_id:id},(err, skill) => {
        if(err) return console.error(err);
        res.send(true);
    });
}

 // Recupere les données du formulaire en POST, vérifie le formulaire et l'ajoute à la base de données
export function AddSkill(req,res){
    let skill=null;
    if(req.body.name==="" || req.body.level==="" || req.body.stars==="" || req.body.category==="" ){
            res.status(401).send({message:"un des champs n'a pas été renseigné."});
            return;
    }
    skill={
       
            name:req.body.name,
            level:req.body.level,
            stars:req.body.stars,
            category:req.body.category,
            description:req.body.description,
            date_create:new Date(),
            date_update:new Date()
    }

    let new_skill = new Skill(skill);
    new_skill.save(function (err, skill) {
    if (err) return console.error(err);
        res.status(200).send(true);
    });
  }

 // Recupere les données du formulaire en PUT, vérifie le formulaire et l'ajoute à la base de données
export function EditSkill(req,res){
    const id=req.params.id;
    let skill=null;
    if(req.body.name==="" || req.body.level==="" || req.body.stars==="" || req.body.category==="" ){
            res.status(401).send({message:"un des champs n'a pas été renseigné."});
            return;
    }
    skill={
       
            name:req.body.name,
            level:req.body.level,
            stars:req.body.stars,
            category:req.body.category,
            description:req.body.description,
            date_update:new Date()
    }

    Skill.findOneAndUpdate({_id:id}, skill,function (error, success) {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(true);
        }
    });
  }


