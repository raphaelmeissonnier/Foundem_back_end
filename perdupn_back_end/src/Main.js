//Importation des classes
var Position = require('./Position');
var LocalisationPrecise = require('./LocalisationPrecise');
var LocalisationFloue = require('./LocalisationFloue');
var ObjetTrouve = require('./ObjetTrouve');
var ObjetPerdu = require('./ObjetPerdu');

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

    var ObjetPerdu1 = new ObjetPerdu("hightech", localisationObjetPerdu1,"Clé de maison perdu pres de Dreux", "Mes Clés", Date.now());
    var ObjetPerdu2 = new ObjetPerdu("hightech", localisationObjetPerdu2,"Iphone X perdu a Nanterre", "Iphone X", Date.now());
    var ObjetPerdu3 = new ObjetPerdu("hightech", localisationObjetPerdu3,"AirPods perdu près de Porte de la Chapelle", "AirPods", Date.now());
    var ObjetPerdu4 = new ObjetPerdu("autres", localisationObjetPerdu4,"Mon Enfant a perdu sa peluche a DisneyLand, sa peluche ressemble a Mickey", "Peluche Mickey", Date.now());
    var ObjetPerdu5 = new ObjetPerdu("garde_robe", localisationObjetPerdu5,"Bonnet Lacoste", "Bonnet Lacoste", Date.now());

    var ObjetTrouve1 = new ObjetTrouve("clés", localisationObjetTrouve1, "Trousseau de clés trouvés à la sortie d'un magasin.", "3 clés avec un badge", Date.now());
    var ObjetTrouve2 = new ObjetTrouve("téléphone", localisationObjetTrouve2, "Iphone 7 avec une coque bleue trouvé sur un banc d'arrêt de bus", "Iphone 7",Date.now() );
    var ObjetTrouve3 = new ObjetTrouve("écouteurs", localisationObjetTrouve3, "AirPods de couleur blanc trouvé avec leur étui", "AirPods blanc", Date.now());
    var ObjetTrouve4 = new ObjetTrouve("peluche", localisationObjetTrouve4, "Peluche en forme de lapin de couleur marron", "Peluche marron", Date.now());
    var ObjetTrouve5 = new ObjetTrouve("bonnet", localisationObjetTrouve5, "Bonnet noir de marque Lacoste", "Bonnet noir", Date.now());

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
    console.log(JSON.stringify([...mapSort2]));

    return JSON.stringify([...mapSort2]);
}

function ajoutObjetTrouve(intitule, description, categorie, date, longitude, latitude, adresseMail)
{
    var position = new Position(longitude, latitude);
    var localisation = new LocalisationPrecise(position);
    var objetTrouve = new ObjetTrouve(categorie, localisation, description, intitule, date, adresseMail);
    return objetTrouve;
}

function test()
{
    var str1 = "iphone"
    var str2 = "Iphone X"
    var str = new RegExp(str1,"gmi")
    var res= str2.match(str);
    console.log(res)
    
}

function chercherObjetPerdu(intitule, categorie, date, longitude,latitude){
    var mapObjets=creationObjet();
    var mapObjetsTrouve= new Map();
    var intitule_reg=new RegExp(intitule,"gmi")
    var cptVal=0;
    console.log("Dans Chercher Objet Perdu Back")
    for(var i=0; i<mapObjets.length; i++)
    {
        if(mapObjets[i] instanceof ObjetTrouve)
        {
            if(mapObjets[i].categorie==categorie){
                cptVal+=4;
            }
            if(mapObjets[i].intitule.match(intitule_reg)){
                cptVal+=2;
            }
            var d1=mapObjets[i].getLocalisation();
            var d2= d1.getPosition();
            var rayon=10;
            let distance = Math.sqrt((Math.pow(( d2.getLongitude() - longitude), 2)) + (Math.pow((d2.getLatitude() - latitude), 2))) - rayon;
            if(distance < 0)
            {
                cptVal+=3;
            }
        }
        else{
            break;
        }    
    }

    console.log("MapReturn",mapObjetsTrouve)
    return JSON.stringify([...mapObjetsTrouve]);
}
module.exports = {createPositionUser,affichageObjetProche, ajoutObjetTrouve, chercherObjetPerdu, test}


