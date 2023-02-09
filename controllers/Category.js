//import le model thea,user,category
import {CategorySkills,CategoryProject} from "../database.js";

// recupere une catégorie des compétences avec le name
export function GetCategorySkillByName(req,res){
    const name=req.params.id;
    CategorySkills.find({name:name},(err, category) => {
        if(err) return console.error(err);
      res.json(category);
    });
  }

// recupere une catégorie de compétence par l'object id
export function GetCategorySkillById(req,res){
    const id=req.params.id;
    CategorySkills.find({_id:id},(err, category) => {
        if(err) return console.error(err);
      res.json(category);
    });
  }
  

// recuperer toutes les catégories des compétences
export function GetAllCategorySkill(req,res){
    CategorySkills.find({},(err, category) => {
        if(err) return console.error(err);
      res.json(category);
    });
  }

// Supprimer une Catégorie de compétences
export function DeleteCategorySkill(req,res){
    const id=req.params.id;
    CategorySkills.deleteOne({_id:id},(err, cat) => {
        if(err) return console.error(err);
        res.send(true);
    });
  }

// Recupere les données du formulaire en POST, vérifie le formulaire et l'ajoute à la base de donnée

export function AddCategorySkill(req,res){
    let category_skill=null;
    if(req.body.name==="" || req.body.description===""){
            res.status(401).send({message:"un des champs n'a pas été renseigné."});
            return;
    }
    CategorySkills.find({name:req.body.name},(err, category) => {
        if(err) return console.error(err);
        if(category.length>0){
            res.status(500).send(false);
        }
        else{
            category_skill={
                    name:req.body.name,
                    description:req.body.description,
                    date_create:new Date(),
                    date_update:new Date()
                }
            let new_category = new CategorySkills(category_skill);
            new_category.save(function (err, category) {
            if (err) return console.error(err);
                res.status(200).send(true);
            });
        }
    });
  
  }

  // Recupere les données du formulaire en POST, vérifie le formulaire et modifie la catégorie en base de donnée
export function UpdateCategorySkill(req,res){
    const id=req.params.id;
    let category_skill=null;
    
  
    if(req.body.name==="" || req.body.description===""){
        res.status(401).send({message:"un des champs n'a pas été renseigné."});
        return;
    }
    CategorySkills.find({name:req.body.name},(err, category) => {
        if(err) return console.error(err);
        if(category.length>0 && (category[0]._id).toString()!==id){
          res.status(500).send(false);
        }
        else{
  
            category_skill={
                name:req.body.name,
                description:req.body.description,
                date_update:new Date()
            }
                CategorySkills.findOneAndUpdate({_id:id}, category_skill,function (error, success) {
                  if (error) {
                      console.log(error);
                  } else {
                      res.status(200).send(true);
                  }
              });
  
        }
    });
  
  }

  // recupere une catégorie de projet par l'object id
  export function GetCategoryProjectById(req,res){
    const id=req.params.id;
    CategoryProject.find({_id:id},(err, category) => {
        if(err) return console.error(err);
      res.json(category);
    });
  }

// recupere une catégorie des projets avec le name
export function GetCategoryProjectByName(req,res){
    const name=req.params.id;
    CategoryProject.find({name:name},(err, category) => {
        if(err) return console.error(err);
      res.json(category);
    });
  }


   // recuperer toutes les catégories des projets
export function GetAllCategoryProject(req,res){
    CategoryProject.find({},(err, category) => {
        if(err) return console.error(err);
      res.json(category);
    });
  }

  // Supprimer une Catégorie de projet
export function DeleteCategoryProject(req,res){
    const id=req.params.id;
    CategoryProject.deleteOne({_id:id},(err, cat) => {
        if(err) return console.error(err);
        res.send(true);
    });
  }

  // Recupere les données du formulaire en POST, vérifie le formulaire et l'ajoute à la base de donnée

export function AddCategoryProject(req,res){
    let category_project=null;
    if(req.body.name==="" || req.body.description===""){
            res.status(401).send({message:"un des champs n'a pas été renseigné."});
            return;
    }
    CategoryProject.find({name:req.body.name},(err, category) => {
        if(err) return console.error(err);
        if(category.length>0){
          
          res.status(500).send(false);
        }
        else{
            category_project={
                    name:req.body.name,
                    description:req.body.description,
                    date_create:new Date(),
                    date_update:new Date()
                }
            let new_category = new CategoryProject(category_project);
            new_category.save(function (err, category) {
            if (err) return console.error(err);
                res.status(200).send(true);
                
            });
        }
    });
  }

// Recupere les données du formulaire en PUT, vérifie le formulaire et modifie la catégorie en base de donnée
export function UpdateCategoryProject(req,res){
    const id=req.params.id;
    let category_project=null;
    
  
    if(req.body.name==="" || req.body.description===""){
        res.status(401).send({message:"un des champs n'a pas été renseigné."});
        return;
    }
    CategoryProject.find({name:req.body.name},(err, category) => {
        if(err) return console.error(err);
        if(category.length>0 && (category[0]._id).toString()!==id){
          res.status(500).send(false);
        }
        else{
  
            category_project={
                name:req.body.name,
                description:req.body.description,
                date_update:new Date()
            }
                CategoryProject.findOneAndUpdate({_id:id}, category_project,function (error, success) {
                  if (error) {
                      console.log(error);
                  } else {
                      res.status(200).send(true);
                  }
              });
  
        }
    });
  
  }