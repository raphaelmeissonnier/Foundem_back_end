class ObjetTrouve implements Objet
{
    constructor(string name, Localisation localisation)
    {
        super(name, localisation);
    }

    getName() : string
    {
        return $`this.name`;
    }

    getLocalisation() : Localisation
    {
        return $`this.localisation`;
    }

}

export = ObjetTrouve;
