class Objet
{
    constructor(categorie, localisation)
    {
        if(typeof categorie === 'string' && typeof localisation === 'object')
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