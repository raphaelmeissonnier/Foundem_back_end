const Localisation = require('./Localisation');


class CalculateurPrecis
{
    constructor(){
        if(CalculateurPrecis._instance){
            return  CalculateurPrecis._instance      
        }
        CalculateurPrecis._instance=this;
    }

    getDistanceLocalisationPrecise(localisationUser, localisationObjet)
    {
            if(localisationObjet instanceof Localisation && localisationUser instanceof Localisation)
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
    }
}

module.exports = CalculateurPrecis;