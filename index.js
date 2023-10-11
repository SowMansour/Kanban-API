require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const router = require('./app/routers');

//methode permettant au navigateur de faire des requettes d'un domaine à un autre
app.use(cors());
// Permet de récupérer les données d'un formulaire simple
// nous donne la variable request.body
app.use(express.urlencoded({ extended: true }));

//Multer permet de gerer le format multipart/form-data
const multer = require('multer');
const bodyParser = multer();
// on utlise .none() pour dire qu'on attends pas de fichier, uniquement des inputs "classiques" !
app.use(bodyParser.none());

app.use(router);

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;

app.listen(PORT, () => {
console.log(`Our server is listening on ${BASE_URL}:${PORT}`);
});