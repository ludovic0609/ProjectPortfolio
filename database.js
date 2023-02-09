
//import de dotenv pour les variables d'environnements
import * as dotenv from 'dotenv';
dotenv.config();

const mongoDBUser = process.env.MONGODB_USER;
const mongoDBPassword = process.env.MONGODB_PASSWORD;

// import de mongoose
import mongoose from "mongoose";

//pour se connecter a la base de données mongoDB à distances
const  mongoAtlasUri =
        "mongodb+srv://"+mongoDBUser+":"+mongoDBPassword+"@cluster0.jobq18y.mongodb.net/projet_portfolio";

const mongoDBlocal="mongodb://0.0.0.0:27017/projet_portfolio";
//Connexion à la base de données mongoDB en local
//mongoose.connect(mongoDBlocal);

//connexion à la base de donné mongoDB a distance
mongoose.connect(mongoAtlasUri);


// si erreur affiche un log 
mongoose.connection.on("error", () =>{
    console.log("Connexion impossible à la base de données");
});

// Schema du document Profil (information sur la personne)
let ProfilSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: String,
    civilite:String,
    firstname: String,
    lastname: String,
    date_of_year:Date,
    title:String,
    description: String,
    my_situation:String,
    file_cv:String,
    adresse: String,
    code_postal: String,
    commune: String,
    telephone:String,
    date_create: Date,
    date_update: Date,
    date_connexion : Date,
    picture_profil: String
});

// Schema du document Education (le parcours scolaire/formation)
let EducationSchema = new mongoose.Schema({
    name_school:String,
    city:String,
    country:String,
    diplome:String,
    title_diplome:String,
    level_diplome:String,
    website:String,
    description:String,
    date_start_education:Date,
    date_end_education:Date,
    date_create: Date,
    date_update: Date
});

// Schema de l'experience professionnelle 
let WorkExperienceSchema = new mongoose.Schema({
    title_job:String,
    name_company:String,
    website:String,
    city:String,
    country:String,
    description:String,
    date_start_work:Date,
    date_end_work:Date,
    date_create: Date,
    date_update: Date,
    tasks:[]
});

// Schema des projets
let ProjectSchema = new mongoose.Schema({
    title:String,
    description:String,
    image_project:String,
    website:String,
    link_github:String,
    ressources:[],
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorie_project"
    },
    date_create: Date,
    date_update: Date
});

// Schema des compétences
let SkillSchema = new mongoose.Schema({
    name:String,
    description:String,
    level:String,
    stars:Number,
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorie_skills"
    },
    date_create: Date,
    date_update: Date
});


// Schema du document Category project
let CategoryProjectShema = new mongoose.Schema({
    name: String,
    description:String,
    date_create:Date,
    date_update:Date
});

// Schema du document Category project
let CategorySkillsShema = new mongoose.Schema({
    name: String,
    description:String,
    date_create:Date,
    date_update:Date
});



//export des model 
export let Profil = mongoose.model("profile", ProfilSchema);

export let Education = mongoose.model("education", EducationSchema);

export let WorkExperience = mongoose.model("work_experience", WorkExperienceSchema);

export let Project = mongoose.model("project", ProjectSchema);

export let Skill = mongoose.model("skill", SkillSchema);


export let CategoryProject= mongoose.model("categorie_project", CategoryProjectShema);
export let CategorySkills= mongoose.model("categorie_skills", CategorySkillsShema);



