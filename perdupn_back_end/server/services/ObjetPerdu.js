const Objet = require("./Objet");
const Calculateur = require("./Calculateur");

class ObjetPerdu extends Objet
{
    constructor(id, categorie, localisation, description, intitule, date, userId)
    {
        super(id, categorie, localisation, description, intitule, date, userId);
        this.calculateur = new Calculateur();
    }

    getCategorie()
    {
        return super.getCategorie();
    }

    getLocalisation()
    {
        return super.getLocalisation();
    }

    getDate(){
        return super.getDate();
    }

    getIntitule(){
        return super.getIntitule();
    }

    //PB AU NIVEAU DU RETOUR
    getDistance(localisationUser)
    {
        return this.calculateur.getDistanceLocalisationFloue(localisationUser, this.localisation);
    }
}

module.exports = ObjetPerdu;