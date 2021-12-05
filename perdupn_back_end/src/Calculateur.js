const Localisation = require('./Localisation');
var haversine = require("haversine-distance");


class Calculateur
{
    constructor(){
       this.foo="bar"
    }

    getDistanceLocalisationPrecise(localisationUser, localisationObjet)
    {
            if(localisationObjet instanceof Localisation && localisationUser instanceof Localisation)
            {
                var positionUser = localisationUser.getPosition();
                var positionObjet = localisationObjet.getPosition();
                var user = { lat: positionUser.getLatitude(), lng: positionUser.getLongitude() }    ;
                var objet = { lat: positionObjet.getLatitude(), lng: positionObjet.getLongitude() }   ;
                return (haversine(user, objet))/1000;
            }
    }

    getDistanceLocalisationFloue(localisationUser, localisationObjet)
    {
        
        if(localisationObjet instanceof Localisation && localisationUser instanceof Localisation)
        {
            //On récupère le rayon de l'objet
            let rayon = localisationObjet.getRayon();

            //On récupère la longitude et latitude du user
            var positionUser = localisationUser.getPosition();
            var positionObjet = localisationObjet.getPosition();
            var user = { lat: positionUser.getLatitude(), lng: positionUser.getLongitude() };

            //On récupère la longitude et latitude de l'objet
            var objet = { lat: positionObjet.getLatitude(), lng: positionObjet.getLongitude() };

            //On calcule la distance entre l'objet et l'user
            var distance = ((haversine(user, objet))/1000)-rayon;
            if(distance < 0)
            {
                distance = distance * (-1);
            }
            return distance;
        }
    }
}

module.exports = Calculateur;
