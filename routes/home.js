import express from "express";
const router = express.Router();

import {EditProfil, getProfil, GetProfilById} from "../controllers/Profil.js";
import { LogoutUser,SubmitLogin } from "../controllers/Users.js";

import {GetCategorySkillByName,GetCategoryProjectByName,
    AddCategorySkill, AddCategoryProject,GetAllCategorySkill,GetAllCategoryProject,
DeleteCategorySkill,DeleteCategoryProject, GetCategorySkillById,
GetCategoryProjectById,UpdateCategorySkill, UpdateCategoryProject} from "../controllers/Category.js";

import {AddSkill,EditSkill,DeleteSkill,GetSkillById,
    GetAllSkill} from "../controllers/Skill.js"; 

import {AddEducation,GetAllEducation,DeleteEducation,GetEducationById,
    EditEducation,
    GetAllEducationOrderByDate} from "../controllers/Education.js";

import {AddWorkExperience,GetAllWorkExperience,DeleteWorkExperience,GetWorkExperienceById,
        EditWorkExperience,
        GetAllWorkExperienceOrderByDate} from "../controllers/WorkExperience.js"; 

import {AddProject,GetAllProject,DeleteProject,GetProjectById,
            EditProject} from "../controllers/Project.js"; 


router.get('/profil',getProfil); // recupere les informations du profile
router.get("/logout",LogoutUser); // route pour se deconnecter
router.get('/skill/category',GetAllCategorySkill); // récupere toutes les catégorie des compétences avec le nom
router.get('/project/category',GetAllCategoryProject); // récupere toutes les catégorie des compétences avec le nom
router.get('/education',GetAllEducation); // récupere tout les diplomes/formations
router.get('/educationbydate',GetAllEducationOrderByDate); // récupere tout les diplomes/formations
router.get('/workexperience',GetAllWorkExperience); // récupere toutes les expériences professionnelle
router.get('/workexperiencebydate',GetAllWorkExperienceOrderByDate); // récupere toutes les expériences professionnelle
router.get('/skill',GetAllSkill); // récupere toutes les compétences
router.get('/project',GetAllProject); // récupere tout les projets

router.get('/skill/category/:id',GetCategorySkillByName); // récupere la catégorie des compétences avec le nom
router.get('/category_skill/:id',GetCategorySkillById); // récupere la catégorie d'une compétence par l'id
router.get('/project/category/:id',GetCategoryProjectByName); // récupere la catégorie des projects avec le nom
router.get('/category_project/:id',GetCategoryProjectById); // récupere la catégorie d'une compétence par l'id
router.get('/education/:id',GetEducationById); // récupere un diplome/formation par l'id
router.get('/workexperience/:id',GetWorkExperienceById); // récupere une expérience professionnelle par l'id
router.get('/skill/:id',GetSkillById); // récupere une compétence par l'id
router.get('/project/:id',GetProjectById); // récupere un projet par l'id
router.get('/edit/profil/:id',GetProfilById); // récupere un profil par l'id

router.post("/login",SubmitLogin); // route pour se connecter
router.post("/skill/category/add",AddCategorySkill); // Ajouter une Catégorie de compétence
router.post("/project/category/add",AddCategoryProject); // Ajouter une Catégorie de projet
router.post("/education/add",AddEducation); // Ajouter une Education
router.post("/workexperience/add",AddWorkExperience); // Ajouter une Expérience professionnelle
router.post("/skill/add",AddSkill); // Ajouter une Compétence
router.post("/project/add",AddProject); // Ajouter un projet


router.put("/skill/category/edit/:id",UpdateCategorySkill); // Update une Catégorie de compétence
router.put("/project/category/edit/:id",UpdateCategoryProject); // Update une Catégorie de compétence
router.put("/education/edit/:id",EditEducation); // update d'un diplome/formation
router.put("/workexperience/edit/:id",EditWorkExperience); // update d'une expérience professionnelle
router.put("/skill/edit/:id",EditSkill); // update d'une compétence
router.put("/project/edit/:id",EditProject); // update d'un projet
router.put("/profil/edit/:id",EditProfil); // update du profil

router.delete("/delete/skill/category/:id",DeleteCategorySkill); // Supprimer une catégorie de compétence
router.delete("/delete/project/category/:id",DeleteCategoryProject); // Supprimer une catégorie de projet
router.delete("/delete/education/:id",DeleteEducation); // Supprimer un diplome/formation
router.delete("/delete/workexperience/:id",DeleteWorkExperience); // Supprimer une expérience professionnelle
router.delete("/delete/skill/:id",DeleteSkill); // Supprimer une compétence
router.delete("/delete/project/:id",DeleteProject); // Supprimer un projet

export default router;