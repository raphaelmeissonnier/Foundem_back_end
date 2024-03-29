//Importation des classes
var Position = require('./Position');
var LocalisationPrecise = require('./LocalisationPrecise');
var LocalisationFloue = require('./LocalisationFloue');
var ObjetTrouve = require('./ObjetTrouve');
var ObjetPerdu = require('./ObjetPerdu');
var haversine = require("haversine-distance");


function createPositionUser(longitudeUser,latitudeUser){
    var positionUser = new Position(longitudeUser,latitudeUser);
    return new LocalisationPrecise(positionUser);
}

function creationObjet(){
    //Creation Objet Perdu
    var positionObjetPerdu1 = new Position(2.3488, 48.8534);//PARIS
    var positionObjetPerdu2 = new Position(2.3488, 50.8534);//Bollezeele 59
    var positionObjetPerdu3 = new Position(2.75, 49.8534);//Herleville 80
    var positionObjetPerdu4 = new Position(2.2, 48.9);//Nanterre
    var positionObjetPerdu5 = new Position(2.054, 47.9);//Mardié 45

    var localisationObjetPerdu1 = new LocalisationFloue(positionObjetPerdu1,2);
    var localisationObjetPerdu2 = new LocalisationFloue(positionObjetPerdu2,2);
    var localisationObjetPerdu3 = new LocalisationFloue(positionObjetPerdu3,2);
    var localisationObjetPerdu4 = new LocalisationFloue(positionObjetPerdu4,2);
    var localisationObjetPerdu5 = new LocalisationFloue(positionObjetPerdu5,2);

    //Creation Objet Trouve
    var positionObjetTrouve1 = new Position(2.1, 49); //Conflans
    var positionObjetTrouve2 = new Position(2.3488, 51,25);//Armbouts-Cappel 59
    var positionObjetTrouve3 = new Position(2.84, 48.7434);//Les Chapelles-Bourbon 77
    var positionObjetTrouve4 = new Position(2.9, 48.125);//Dpt 45
    var positionObjetTrouve5 = new Position(2.6988, 48.3434);//Dpt 77

    var localisationObjetTrouve1 = new LocalisationPrecise(positionObjetTrouve1);
    var localisationObjetTrouve2 = new LocalisationPrecise(positionObjetTrouve2);
    var localisationObjetTrouve3 = new LocalisationPrecise(positionObjetTrouve3);
    var localisationObjetTrouve4 = new LocalisationPrecise(positionObjetTrouve4);
    var localisationObjetTrouve5 = new LocalisationPrecise(positionObjetTrouve5);

    var ObjetPerdu1 = new ObjetPerdu("High-Tech", localisationObjetPerdu1,"Clé de maison perdu pres de Dreux", "Mes Clés", new Date('2021-11-02'));
    var ObjetPerdu2 = new ObjetPerdu("High-Tech", localisationObjetPerdu2,"Iphone X perdu a Nanterre", "Iphone X", new Date('2021-04-02'));
    var ObjetPerdu3 = new ObjetPerdu("High-Tech", localisationObjetPerdu3,"AirPods perdu près de Porte de la Chapelle", "AirPods", new Date('2021-10-02'));
    var ObjetPerdu4 = new ObjetPerdu("Autres", localisationObjetPerdu4,"Mon Enfant a perdu sa peluche a DisneyLand, sa peluche ressemble a Mickey", "Peluche Mickey", new Date('2021-10-25'));
    var ObjetPerdu5 = new ObjetPerdu("Garde-Robe", localisationObjetPerdu5,"Bonnet Lacoste", "Bonnet Lacoste", new Date('2021-09-02'));

    var ObjetTrouve1 = new ObjetTrouve("Autres", localisationObjetTrouve1, "Trousseau de clés trouvés à la sortie d'un magasin.", "3 clés avec un badge", new Date('2021-11-01'));
    var ObjetTrouve2 = new ObjetTrouve("High-Tech", localisationObjetTrouve2, "Iphone 7 avec une coque bleue trouvé sur un banc d'arrêt de bus", "Iphone 7",new Date('2021-07-02') );
    var ObjetTrouve3 = new ObjetTrouve("High-Tech", localisationObjetTrouve3, "AirPods de couleur blanc trouvé avec leur étui", "AirPods blanc", new Date('2021-02-15'));
    var ObjetTrouve4 = new ObjetTrouve("Autres", localisationObjetTrouve4, "Peluche en forme de lapin de couleur marron", "Peluche marron", new Date('2021-03-30'));
    var ObjetTrouve5 = new ObjetTrouve("Garde-Robe", localisationObjetTrouve5, "Bonnet noir de marque Lacoste", "Bonnet noir", new Date('2021-10-02'));

    return [ObjetPerdu1, ObjetPerdu2, ObjetPerdu3, ObjetPerdu4, ObjetPerdu5, ObjetTrouve1, ObjetTrouve2, ObjetTrouve3, ObjetTrouve4, ObjetTrouve5]
}

function affichageObjetProche(longitudeUser,latitudeUser, rayon, mapObjets){
    //var mapObjets=creationObjet();
    var localisationUser = createPositionUser(longitudeUser, latitudeUser);
    var mapObjetsDistance = new Map();

    //Calcul de la distance entre le user et l'objet1
    for(var i=0; i<mapObjets.length; i++)
    {
        if(i<10 && mapObjets[i].getDistance(localisationUser)<=rayon)
        {
           console.log("Distance", mapObjets[i].getDistance(localisationUser))
           mapObjetsDistance.set(mapObjets[i], mapObjets[i].getDistance(localisationUser));
        }
    }

    const mapSort2 = new Map([...mapObjetsDistance.entries()].sort((a, b) => a[1] - b[1]));
    console.log(JSON.stringify([...mapSort2]));

    return JSON.stringify([...mapSort2]);
}


function ajoutObjetTrouve(intitule, description, categorie, date, longitude, latitude, adresseMail)
{
    var position = new Position(longitude, latitude);
    var localisation = new LocalisationPrecise(position);
    return new ObjetTrouve(categorie, localisation, description, intitule, date, adresseMail);
}

function suggestionObjetPerdu(longitude,latitude){
    var mapObjets=creationObjet();
    //var localisationUser = createPositionUser(longitude, latitude);
    var mapObjetsSuggestion = new Map();

    for(var i=0; i<mapObjets.length; i++)
    {
        if(i<10  && mapObjets[i] instanceof(ObjetPerdu))
        {
           mapObjetsSuggestion.set(mapObjets[i]);
        }
    }

    const mapSort2 = new Map([...mapObjetsSuggestion.entries()].sort((a, b) => a[1] - b[1]));
    console.log("Tab envoyé dans le back ####",JSON.stringify([...mapSort2]));

    return JSON.stringify([...mapSort2]);

}

function ajoutObjetPerdu(intitule, description, categorie, date, longitude, latitude, adresseMail, rayon)
{
    var position = new Position(longitude, latitude);
    var localisation = new LocalisationFloue(position, rayon);
    return new ObjetPerdu(categorie, localisation, description, intitule, date, adresseMail);
}

function differenceDate(date1,date2)
{
    //const today = new Date(new Date().toISOString().slice(0,10));
    //const x = new Date('2021-11-02');
    const diffTime = Math.abs(date1-date2);
    const diffDate = Math.ceil(diffTime/(1000*60*60*24));
    console.log("Diff Date",diffDate)
    return diffDate;
    
}

module.exports = {createPositionUser,affichageObjetProche, ajoutObjetTrouve, differenceDate, creationObjet, suggestionObjetPerdu}
