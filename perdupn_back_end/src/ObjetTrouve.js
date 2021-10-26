const Objet = require("./Objet");
const CalculateurPrecis = require("./CalculateurPrecis");


class ObjetTrouve extends Objet
{
    constructor(categorie, localisation, description, intitule, date)
    {
        super(categorie, localisation, description, intitule, date);
        this.calculateur = new CalculateurPrecis();

    }

    getCategorie()
    {
        return super.getCategorie();
    }

    getLocalisation()
    {
        return super.getLocalisation();
    }

    getDistance(localisationUser)
    {
        //this.calculateur.setDistance(this.calculateur.getDistanceLocalisationPrecise(localisationUser, this.localisation));
        //return this.calculateur;
        return this.calculateur.getDistanceLocalisationPrecise(localisationUser, this.localisation);
    }
}

module.exports = ObjetTrouve;
