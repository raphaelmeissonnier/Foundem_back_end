const Localisation = require('./Localisation');

class Objet
{
    constructor(categorie, localisation, description, intitule, date)
    {
        if(typeof categorie === 'string' && localisation instanceof Localisation)
        {
            this.categorie = categorie;
            this.localisation = localisation;
            this.description = description;
            this.intitule = intitule;
            this.date = date;
        }
        else
        {
            throw 'LES PARAMETRES FOURNIS NE SONT PAS BONS !'
        }
    }

    getCategorie()
    {
        return this.categorie;
    }

    getLocalisation()
    {
        return this.localisation;
    }
}

module.exports = Objet;