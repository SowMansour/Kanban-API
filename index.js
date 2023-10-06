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

app.use(router);

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;

app.listen(PORT, () => {
console.log(`Our server is listening on ${BASE_URL}:${PORT}`);
});