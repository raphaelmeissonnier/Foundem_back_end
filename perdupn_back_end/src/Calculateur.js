const Localisation = require('./Localisation');
var haversine = require("haversine-distance");


class Calculateur
{
    constructor(){
       this.foo="bar"
    }

    getDistanceLocalisationPrecise(localisationUser, localisationObjet)
    {
            /*if(localisationObjet instanceof Localisation && localisationUser instanceof Localisation)
            {
                //A MOCKER ?
                function toRad(x){
                    return x * Math.PI/180;
                }

                //On récupère la position et les coordonnées du user
                let positionUser = localisationUser.getPosition();
                let longitudeUser = positionUser.getLongitude();
                let latitudeUser = positionUser.getLatitude();

                //On récupère la position et les coordonnées de l'objet
                let positionObjet = localisationObjet.getPosition();
                let longitudeObjet = positionObjet.getLongitude();
                let latitudeObjet = positionObjet.getLatitude();

                var latitudeDis= latitudeObjet-latitudeUser;
                var dLat= toRad(latitudeDis);
                var longitudeDis= longitudeObjet-longitudeUser;
                var dLong= toRad(longitudeDis);

                var a= Math.sin(dLat/2)* Math.sin(dLat/2) +
                    Math.cos(toRad(latitudeUser)) * Math.cos(toRad(latitudeObjet)) *
                    Math.sin(dLong/2) * Math.sin(dLong/2);

                var rayon = 10;//KM
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                var d = rayon * c;

                return d;
            }*/
            var positionUser = localisationUser.getPosition();
            var positionObjet = localisationObjet.getPosition();
            var user = { lat: positionUser.getLatitude(), lng: positionUser.getLongitude() }    ;
            var objet = { lat: positionObjet.getLatitude(), lng: positionObjet.getLongitude() }   ;
            return (haversine(user, objet))/1000;
    }

    getDistanceLocalisationFloue(localisationUser, localisationObjet)
    {
        if(localisationObjet instanceof Localisation && localisationUser instanceof Localisation)
        {
            //On récupère la position et les coordonnées du user
            let positionUser = localisationUser.getPosition();
            let longitudeUser =  positionUser.getLongitude();
            let latitudeUser =  positionUser.getLatitude();

            //On récupère la position, les coordonnées et le rayon de l'objet
            let positionObjet = localisationObjet.getPosition();
            let longitudeObjet =  positionObjet.getLongitude();
            let latitudeObjet =  positionObjet.getLatitude();
            let rayon = localisationObjet.getRayon();

            //On calcule la distance avec la formule |sqrt((x1 - h)² + (y1 - k)²) - r|
            let distance = Math.sqrt((Math.pow((longitudeUser - longitudeObjet), 2)) + (Math.pow((latitudeUser - latitudeObjet), 2))) - rayon;
            if(distance < 0)
            {
                distance = distance * (-1);
            }
            return distance;
        }
    }
}

module.exports = Calculateur;