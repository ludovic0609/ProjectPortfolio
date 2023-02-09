
import express from "express";
import router from "./routes/home.js";
import session from 'express-session';
import cors from "cors";

//initilisation du framework express nodejs
const app = express();
const port = 8080;

//initialisation de cors pour les problèmes lié au appel de route depuis le front.
app.use(cors({ origin: true }));

//initialisation du système de sessions
app.use(session({
	secret: 'keyboard_portfolio',
	resave:false,
	saveUninitialized: true,
	cookie: {maxAge: 3600000}
}));


app.use(express.json()); // Pour parser application/json
app.use(express.urlencoded({extended: true})); // Pour parser application/x-www-form-urlencoded

app.use(express.static('./portfolio/public'));


//pour utiliser le router -> import router from "./routes/home.js";
app.use('/',router);   


//ecouter le port  -> const port = 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
