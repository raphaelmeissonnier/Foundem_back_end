const Localisation = require('./Localisation');

class Objet
{
    constructor(categorie, localisation)
    {
        if(typeof categorie === 'string' && localisation instanceof Localisation)
        {
            this.categorie = categorie;
            this.localisation = localisation;
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