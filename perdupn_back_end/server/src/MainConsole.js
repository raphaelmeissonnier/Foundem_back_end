//Importation des classes
var Position = require('./Position');
var LocalisationPrecise = require('./LocalisationPrecise');
var LocalisationFloue = require('./LocalisationFloue');
var ObjetTrouve = require('./ObjetTrouve');
var ObjetPerdu = require('./ObjetPerdu');

//Variable globale
var scanf = require('scanf');

//Demande des coordonées au user
console.log("Veuillez entrer une longitude");
var longitude = scanf('%f');
console.log("Veuillez entrer une latitude");
var latitude = scanf('%f');


//Création d'un user et de sa localisation
let positionUser = new Position(longitude, latitude);
let localisationUser = new LocalisationPrecise(positionUser);


//Création d'une collection d'objet trouvés
let positionObjet1 = new Position(2.05, 48.9333); //Poissy
let positionObjet2 = new Position(2.3488, 48.8534); //Paris
let positionObjet3 = new Position(2.2, 48.9); //Nanterre
let localisationObjet1 = new LocalisationPrecise(positionObjet1);
let localisationObjet2 = new LocalisationPrecise(positionObjet2);
let localisationObjet3 = new LocalisationPrecise(positionObjet3);
let objet1 = new ObjetTrouve("clés", localisationObjet1);
let objet2 = new ObjetTrouve("téléphone", localisationObjet2);
let objet3 = new ObjetTrouve("bonnet", localisationObjet3);

//Création d'une collection d'objet trouvés
let positionObjet4 = new Position(2.05, 48.9333); //Poissy
let positionObjet5 = new Position(2.3488, 48.8534); //Paris
let positionObjet6 = new Position(2.2, 48.9); //Nanterre
let localisationObjet4 = new LocalisationFloue(positionObjet4, 2);
let localisationObjet5 = new LocalisationFloue(positionObjet5, 5);
let localisationObjet6 = new LocalisationFloue(positionObjet6, 3);
let objet4 = new ObjetPerdu("clés", localisationObjet4);
let objet5 = new ObjetPerdu("téléphone", localisationObjet5);
let objet6 = new ObjetPerdu("bonnet", localisationObjet6);

let tableauObjets = [objet1, objet2, objet3, objet4, objet5, objet6];

//Tableau d'objets + distance
var mapObjetsDistance = new Map();

//Calcul de la distance entre le user et l'objet1
for(var i=0; i<tableauObjets.length; i++)
{
    if(i<10)
    {
        mapObjetsDistance.set(tableauObjets[i], tableauObjets[i].getDistance(localisationUser));
    }
    else
    {
        break;
    }
}

//Trier le tableau d'objets + distance
const mapSort2 = new Map([...mapObjetsDistance.entries()].sort((a, b) => a[1] - b[1]));
console.log(mapSort2);


