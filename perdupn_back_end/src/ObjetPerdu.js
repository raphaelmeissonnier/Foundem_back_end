const Objet = require("./Objet");
const CalculateurFloue = require("./CalculateurFloue");

class ObjetPerdu extends Objet
{
    constructor(categorie, localisation, description, intitule, date)
    {
        super(categorie, localisation, description, intitule, date);
        this.calculateur = new CalculateurFloue(); //Singleton in Calculateur constructor
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
        return this.calculateur.getDistanceLocalisationFloue(localisationUser, this.localisation);
    }
}

module.exports = ObjetPerdu;
