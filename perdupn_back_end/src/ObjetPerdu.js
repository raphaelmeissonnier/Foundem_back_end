const Objet = require("./Objet");

class ObjetPerdu extends Objet
{
    constructor(name, localisation)
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

module.exports = ObjetPerdu;
