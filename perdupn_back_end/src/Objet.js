class Objet
{
    constructor(string name, Localisation localisation)
    {
        this.name = name;
        this.localisation = localisation;
    }

    getName()
    {
        return this.name;
    }

    setName(string name)
    {
        this.name = name;
    }

    getLocalisation()
    {
        return this.localisation;
    }

    setLocalisation(Localisation localisation)
    {
        this.localisation = localisation;
    }

}

export Objet;