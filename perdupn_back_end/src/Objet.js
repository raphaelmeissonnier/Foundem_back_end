class Objet
{
    constructor(name, localisation)
    {
        if(typeof name === 'string' && typeof localisation === 'object')
        {
            this.name = name;
            this.localisation = localisation;
        }
        else
        {
            throw 'LES PARAMETRES FOURNIS NE SONT PAS BONS !'
        }
    }

    getName()
    {
        return this.name;
    }

    setName(name)
    {
        if(typeof name === 'string')
        {
            this.name = name;
        }
        else
        {
            throw 'LE PARAMETRE FOURNI NE SONT PAS BONS !'
        }
    }

    getLocalisation()
    {
        return this.localisation;
    }

    setLocalisation(localisation)
    {
        if(typeof localisation === 'object')
        {
            this.localisation = localisation;
        }
        else
        {
            throw 'LE PARAMETRE FOURNI NE SONT PAS BONS !'
        }
    }
}

module.exports = Objet;