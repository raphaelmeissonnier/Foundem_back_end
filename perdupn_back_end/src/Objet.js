const Localisation = require('./Localisation');

class Objet
{
    constructor(categorie, localisation, description, intitule, date, adresseMail)
    {
        if(typeof categorie === 'string' && localisation instanceof Localisation)
        {
            this.categorie = categorie;
            this.localisation = localisation;
            this.description = description;
            this.intitule = intitule;
            this.date = date;
            this.adresseMail = adresseMail;
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

    getIntitule(){
        return this.intitule;
    }

    getDate(){
        return this.date;
    }
}

module.exports = Objet;