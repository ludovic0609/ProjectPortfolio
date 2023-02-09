//import le model user
import {Profil} from "../database.js";

//import bcrypt pour crypter le mot de passe en base de données
import bcrypt from 'bcrypt';

//nombre de tour de cryptage
const saltRounds = 10;

// envoi du formulaire de connexion en POST  et test si les champs ont bien été renseigné.
 //si le mail existe et si le mot de passe correspond à ce qui'il y a en base de donnée.

 export function SubmitLogin(req,res){
    const email_form=req.body.email;
    const password_form=req.body.password;
    if(email_form===""){
        res.status(401).send({message:"un des champs n'a pas été renseigné."});
     
        //res.status(500).send("un des champs n'a pas été renseigné");
       
    }
    if(password_form===""){
        res.status(401).send({message:"un des champs n'a pas été renseigné."});
  
    }
    Profil.findOne({email:email_form},(err, users) => {
        if(err) return console.error(err); 
        if(users===null){
            res.status(401).send({message:"email ou mot de passe incorrect."});
        }
        else{
                bcrypt.compare(password_form,users.password)
                .then(function(result){
                    if(result==true){
                        req.session.user=users.email;
                        req.session.isLogged=true;
                        req.session.Role=users.role;
                        
                        res.status(200).send(req.session);
                        
                    }
                    else{
                        res.status(401).send({message:"email ou mot de passe incorrect."});
                    }
            });
        }
    });

 }

 //detruit la session 
 export function LogoutUser(req,res){
    req.session.destroy((err) =>{
		res.send(true);
        
	})
 }