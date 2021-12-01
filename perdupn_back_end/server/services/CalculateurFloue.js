const Localisation = require('./Localisation');


class CalculateurFloue 
{
    constructor(){
        if(CalculateurFloue._instance){
            return  CalculateurFloue._instance      
        }
        CalculateurFloue._instance=this;
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

module.exports = CalculateurFloue;