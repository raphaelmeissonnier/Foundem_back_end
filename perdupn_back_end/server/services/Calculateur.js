const Localisation = require('./Localisation');


class Calculateur
{
    constructor(){
       this.foo="bar"
    }

    getDistanceLocalisationPrecise(localisationUser, localisationObjet)
    {
<<<<<<< Updated upstream:perdupn_back_end/server/src/Calculateur.js
        if(localisationObjet instanceof Localisation && localisationUser instanceof Localisation)
        {
            var positionUser = localisationUser.getPosition();
            var positionObjet = localisationObjet.getPosition();
            var user = { lat: positionUser.getLatitude(), lng: positionUser.getLongitude() }    ;
            var objet = { lat: positionObjet.getLatitude(), lng: positionObjet.getLongitude() }   ;
            return (haversine(user, objet))/1000;
        }
=======
            if(localisationObjet instanceof Localisation && localisationUser instanceof Localisation)
            {
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

                var rayon= 10; //en Km

                var latitudeDis= latitudeObjet-latitudeUser;
                var dLat= toRad(latitudeDis);
                var longitudeDis= longitudeObjet-longitudeUser;
                var dLong= toRad(longitudeDis);

                var a= Math.sin(dLat/2)* Math.sin(dLat/2) +
                    Math.cos(toRad(latitudeUser)) * Math.cos(toRad(latitudeObjet)) *
                    Math.sin(dLong/2) * Math.sin(dLong/2);

                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                var d = rayon * c;

                return d;
            }
>>>>>>> Stashed changes:perdupn_back_end/server/services/Calculateur.js
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