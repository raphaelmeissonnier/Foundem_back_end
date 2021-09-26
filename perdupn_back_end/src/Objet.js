class Objet
{
    constructor(name, localisation)
    {
        this.name = name;
        this.localisation = localisation;
    }

    getName()
    {
        return this.name;
    }

    setName(name)
    {
        this.name = name;
    }

    getLocalisation()
    {
        return this.localisation;
    }

    setLocalisation(localisation)
    {
        this.localisation = localisation;
    }

}

module.exports = Objet;