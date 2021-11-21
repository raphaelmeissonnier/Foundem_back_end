const Objet = require("./Objet");
const Calculateur = require("./Calculateur");

class ObjetPerdu extends Objet
{
    constructor(categorie, localisation, description, intitule, date, adresseMail)
    {
        super(categorie, localisation, description, intitule, date, adresseMail);
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