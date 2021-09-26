const LocalisationPrecise = require("./LocalisationPrecise");
const LocalisationFloue = require("./LocalisationFloue");
const ObjetPerdu = require("./ObjetPerdu");
const ObjetTrouve = require("./ObjetTrouve");

function creationTableauObjet()
{
    let loc = new LocalisationPrecise(13513, 13513);
    let loc1 = new LocalisationFloue(13513, 13513);

    let objet = [new ObjetPerdu('clés', loc1), new ObjetTrouve('téléphone', loc)];

    return JSON.stringify(objet)
}

module.exports = {creationTableauObjet};