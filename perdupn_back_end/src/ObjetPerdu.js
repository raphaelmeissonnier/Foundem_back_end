const Objet = require("./Objet");
const Calculateur = require("./Calculateur");

class ObjetPerdu extends Objet
{
    constructor(categorie, localisation)
    {
        super(categorie, localisation);
    }

    getCategorie()
    {
        return `${super.getCategorie()}`;
    }

    getLocalisation()
    {
        return `${super.getLocalisation()}`;
    }

    //PB AU NIVEAU DU RETOUR
    getDistance(localisationUser)
    {
        calculateur = new Calculateur();
        return calculateur.getDistanceFloue(localisationUser, this.position);
    }
}

module.exports = ObjetPerdu;
