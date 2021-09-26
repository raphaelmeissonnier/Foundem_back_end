const Objet = require("./Objet");

class ObjetTrouve extends Objet
{
    constructor(string name, Localisation localisation)
    {
        super(name, localisation);
    }

    getName()
    {
        return `${super.getName()}`;
    }

    getLocalisation()
    {
        return `${super.getLocalisation()}`;
    }
}

export = ObjetTrouve;
