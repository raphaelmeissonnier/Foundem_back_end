//Importation des classes
var Position = require('./Position');
var LocalisationPrecise = require('./LocalisationPrecise');
var LocalisationFloue = require('./LocalisationFloue');
var ObjetTrouve = require('./ObjetTrouve');
var ObjetPerdu = require('./ObjetPerdu');
/*
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
//console.log("Localisation user: ", localisationUser);


//Création d'une collection d'objet trouvés
let positionObjet1 = new Position(12, 25); //Poissy
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
//console.log("Tableau d'objets: ", tableauObjets);

//Tableau d'objets + distance
var mapObjetsDistance = new Map();

//Calcul de la distance entre le user et l'objet1
for(var i=0; i<tableauObjets.length; i++)
{
    if(i<10)
    {
        mapObjetsDistance.set(tableauObjets[i], tableauObjets[i].getDistance(localisationUser));
    }
    break;
}
//console.log('Distance entre user et objets =', mapObjetsDistance);

//Trier le tableau d'objets + distance
const mapSort2 = new Map([...mapObjetsDistance.entries()].sort((a, b) => a[1] - b[1]));
console.log(mapSort2);
*/

function createPositionUser(longitudeUser,latitudeUser){
    var positionUser = new Position(longitudeUser,latitudeUser);
    var loca = new LocalisationPrecise(positionUser)


    return loca;
}

function creationObjet(){
    //Creation Objet Perdu
    var positionObjetPerdu1 = new Position(2.3488, 48.8534);
    var positionObjetPerdu2 = new Position(2.3488, 50.8534);
    var positionObjetPerdu3 = new Position(2.75, 49.8534);
    var positionObjetPerdu4 = new Position(2.2, 48.9);
    var positionObjetPerdu5 = new Position(2.054, 47.9);

    var localisationObjetPerdu1 = new LocalisationFloue(positionObjetPerdu1,2);
    var localisationObjetPerdu2 = new LocalisationFloue(positionObjetPerdu2,2);
    var localisationObjetPerdu3 = new LocalisationFloue(positionObjetPerdu3,2);
    var localisationObjetPerdu4 = new LocalisationFloue(positionObjetPerdu4,2);
    var localisationObjetPerdu5 = new LocalisationFloue(positionObjetPerdu5,2);

    //Creation Objet Trouve
    var positionObjetTrouve1 = new Position(2.1, 49);
    var positionObjetTrouve2 = new Position(2.3488, 51,25);
    var positionObjetTrouve3 = new Position(2.84, 48.7434);
    var positionObjetTrouve4 = new Position(2.9, 48.125);
    var positionObjetTrouve5 = new Position(2.6988, 48.3434);

    var localisationObjetTrouve1 = new LocalisationPrecise(positionObjetTrouve1);
    var localisationObjetTrouve2 = new LocalisationPrecise(positionObjetTrouve2);
    var localisationObjetTrouve3 = new LocalisationPrecise(positionObjetTrouve3);
    var localisationObjetTrouve4 = new LocalisationPrecise(positionObjetTrouve4);
    var localisationObjetTrouve5 = new LocalisationPrecise(positionObjetTrouve5);

    var ObjetPerdu1 = new ObjetPerdu("clés", localisationObjetPerdu1);
    var ObjetPerdu2 = new ObjetPerdu("téléphone", localisationObjetPerdu2);
    var ObjetPerdu3 = new ObjetPerdu("écouteurs", localisationObjetPerdu3);
    var ObjetPerdu4 = new ObjetPerdu("peluche", localisationObjetPerdu4);
    var ObjetPerdu5 = new ObjetPerdu("bonnet", localisationObjetPerdu5);

    var ObjetTrouve1 = new ObjetTrouve("clés", localisationObjetTrouve1);
    var ObjetTrouve2 = new ObjetTrouve("téléphone", localisationObjetTrouve2);
    var ObjetTrouve3 = new ObjetTrouve("écouteurs", localisationObjetTrouve3);
    var ObjetTrouve4 = new ObjetTrouve("peluche", localisationObjetTrouve4);
    var ObjetTrouve5 = new ObjetTrouve("bonnet", localisationObjetTrouve5);

    var tableauObjets = [ObjetPerdu1, ObjetPerdu2, ObjetPerdu3, ObjetPerdu4, ObjetPerdu5, ObjetTrouve1, ObjetTrouve2, ObjetTrouve3, ObjetTrouve4, ObjetTrouve5]

    return tableauObjets;
}

function affichageObjetProche(longitudeUser,latitudeUser){
    var mapObjets=creationObjet();
    var localisationUser = createPositionUser(longitudeUser,latitudeUser);
    var mapObjetsDistance = new Map();


    //Calcul de la distance entre le user et l'objet1
    for(var i=0; i<mapObjets.length; i++)
    {
        if(i<10)
        {
            mapObjetsDistance.set(mapObjets[i], mapObjets[i].getDistance(localisationUser));
        }
        else{
            break;
        }    
    }

    const mapSort2 = new Map([...mapObjetsDistance.entries()].sort((a, b) => a[1] - b[1]));
    console.log(mapSort2);

    return JSON.stringify(mapSort2.entries());
}

module.exports = {createPositionUser,affichageObjetProche}