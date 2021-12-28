const Objet = require("./Objet");
const Calculateur = require('./Calculateur');


class ObjetTrouve extends Objet
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

    getDistance(localisationUser)
    {
        return this.calculateur.getDistanceLocalisationPrecise(localisationUser, this.localisation);
    }
}

module.exports = ObjetTrouve;