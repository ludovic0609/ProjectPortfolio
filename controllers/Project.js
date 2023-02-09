//import le model Project
import {Project} from "../database.js";

import fs from "fs";
import formidable from "formidable";

// récupère tout les projets
export function GetAllProject(req,res){
    Project.find({},(err, projects) => {
        if(err) return console.error(err);
      res.json(projects);
    });
}
  
// récupère une compétence
export function GetProjectById(req,res){
    const id=req.params.id;
    Project.find({_id:id},(err, project) => {
        if(err) return console.error(err);
      res.json(project);
    });
}

// Supprimer un Projet
export function DeleteProject(req,res){
    const id=req.params.id;
    Project.deleteOne({_id:id},(err, project) => {
        if(err) return console.error(err);
        res.send(true);
    });
}
// Ajouter un Projet 
 export function AddProject(req,res){

   
    const form = formidable();
    let project=null;

    let ressources=[];
    

    form.parse(req, function (err, fields, files){
        const reqRessources=fields.ressource;
        
        const ressources_parse=JSON.parse(reqRessources);
        
        

        if(fields.title==="" || fields.description==="" || fields.category==="" ){
            res.status(401).send({message:"un des champs n'a pas été renseigné."});
            return;
        }

        if(ressources_parse.length>0){
        
            for(let i=0;i<ressources_parse.length;i++){
                if(ressources_parse[i]!==""){
                    ressources.push(ressources_parse[i]);
                }
            }
        }

        if(files.file_project){
            let oldpath = files.file_project.filepath;
            let namefile=fields.image_project;
            let newpath = 'portfolio/public/uploads/projets/'+namefile;
            let rawData = fs.readFileSync(oldpath);
            fs.writeFileSync(newpath, rawData, function (err){
                if (err) throw err;
            }   );

            project = 
            {
                title: fields.title,
                description:fields.description,
                category: fields.category,
                image_project:fields.image_project,
                website:fields.website,
                date_create:new Date(),
                date_update:new Date(),
                ressources:ressources
            };

            }
            else{
            project = 
            {
                title: fields.title,
                description:fields.description,
                category: fields.category,
                image_project:"no_image_available.jpg",
                website:fields.website,
                date_create:new Date(),
                date_update:new Date(),
                ressources:ressources
            };
            }
    
        let new_project = new Project(project);
        new_project.save(function (err, project) {
        if (err) return console.error(err);
                res.status(200).send(true); // renvoi true
           
        });

    });
 }

 // Recupere les données du formulaire en PUT, vérifie le formulaire et l'ajoute à la base de données
 export function EditProject(req,res){
    const id=req.params.id;
    let project=null;

    let ressources=[];

    const form = formidable();
    form.parse(req, function (err, fields, files){
        const reqRessources=fields.ressource;

        const ressources_parse=JSON.parse(reqRessources);

        if(fields.title==="" || fields.description==="" || fields.category==="" ){
            res.status(401).send({message:"un des champs n'a pas été renseigné."});
            return;
        }

        if(ressources_parse.length>0){
            for(let i=0;i<ressources_parse.length;i++){
                if(ressources_parse[i]!==""){
                    ressources.push(ressources_parse[i]);
                }
            }
        }

        let oldpath =null;
        let namefile=null;
        let rawData =null;
        let newpath=null;

        if(files.file_project){
            oldpath = files.file_project.filepath;
            namefile=fields.image_project;
            rawData = fs.readFileSync(oldpath);
            newpath = 'portfolio/public/uploads/projets/'+namefile;

        }

        if(rawData!=null) 
        {
        updateFile(id,"",newpath,rawData,namefile);
        project = 
            {
                title: fields.title,
                description:fields.description,
                category: fields.category,
                image_project:fields.image_project,
                website:fields.website,
                date_update:new Date(),
                ressources:ressources
            };
        }
        else{
        project = 
        {
            title: fields.title,
            description:fields.description,
            category: fields.category,
            website:fields.website,
            date_update:new Date(),
            ressources:ressources
        };
}

    Project.findOneAndUpdate({_id:id}, project,function (error, success) {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(true); // renvoi true
        }
    });

    });
 }

// update du fichier dans le dossier
 function updateFile(id,oldpath,newpath,rawData,namefile){
    const findFile=false;
    Project.find({},(err, project) => {
        if(err) return console.error(err);
        
            if(project.image_project && project.image_project==namefile){
                findFile=true;
            }

    });
    if(findFile==false){
        Project.findOne({_id:id},(err, project) => {
            if(err) return console.error(err);
            fs.writeFile(newpath, rawData, function (err){
                if (err) throw err;
                if(project.image_project!=="no_image_available.jpg"){
                    
                    fs.unlink("portfolio/public/uploads/projets/"+project.image_project, (err => {
                        if (err) console.log(err);
                        
                      }));
                }
                
                }   );
          
        });
        
    }else{
        Project.findOne({_id:id},(err, project) => {
            if(err) return console.error(err);
            fs.writeFile(newpath, rawData, function (err){
                if (err) throw err;
                }   );
          
        });
    }
   
 }

