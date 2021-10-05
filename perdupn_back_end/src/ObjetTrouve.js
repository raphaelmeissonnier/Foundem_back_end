const Objet = require("./Objet");
const Calculateur = require('./Calculateur');


class ObjetTrouve extends Objet
{
    constructor(categorie, localisation)
    {
        super(categorie, localisation);
        this.calculateur = new Calculateur();

    }

    getCategorie()
    {
        return `${super.getCategorie()}`;
    }

    getLocalisation()
    {
        return `${super.getLocalisation()}`;
    }

    getDistance(localisationUser)
    {
        calculateur.setDistance(calculateur.getDistanceLocaFloue(localisationUser, this.localisation));
        return calculateur;
    }
}

module.exports = ObjetTrouve;
