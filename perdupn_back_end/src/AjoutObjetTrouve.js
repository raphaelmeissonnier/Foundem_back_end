//Importation des classes
var ObjetTrouve = require('./ObjetTrouve');
var Objet = require("./Objet");
var Position = require("./Position");
var LocalisationPrecise = require("./LocalisationPrecise");


function AjoutObjetTrouve(){

//Variable globale
var scanf = require('scanf');

//Demande des coordonées au user
console.log("Veuillez entrer une longitude");
var longitude = scanf('%f');
console.log("Veuillez entrer une latitude");
var latitude = scanf('%f');

//Demande de la description d'un objet trouvé
console.log("Veuillez entrer l'intitulé");
var intitule = scanf('%f');
console.log("Veuillez entrer la description");
var description = scanf('%f');
console.log("Veuillez entrer la catégorie");
var categorie = scanf('%s');


//Création d'un user et de sa localisation
let positionUser = new Position(longitude, latitude);
let localisationUser = new LocalisationPrecise(positionUser);

// Création d'un nouvel objet

let objet = new ObjetTrouve(categorie, localisationUser,description,intitule,Date.now());
console.log("L'objet trouvé : ", objet);

return JSON.stringify(objet);
}

module.exports = {AjoutObjetTrouve};