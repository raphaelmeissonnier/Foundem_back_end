const LocalisationPrecise = require("./LocalisationPrecise");
const LocalisationFloue = require("./LocalisationFloue");
const ObjetPerdu = require("./ObjetPerdu");
const ObjetTrouve = require("./ObjetTrouve");

function creationTableauObjet()
{
    let loc = new LocalisationPrecise(2.21367,48.9036);
    let loc1 = new LocalisationFloue(2.25375,48.8056);
    let loc2 = new LocalisationFloue(2.23375,48.7056);
    let loc3 = new LocalisationFloue(2.35375,48.9056);
    let loc4 = new LocalisationFloue(2.45375,48.8466);
    let loc5 = new LocalisationFloue(2.25675,48.7656);
    let loc6 = new LocalisationFloue(2.23995,48.9456);
    let loc7 = new LocalisationFloue(2.45175,48.3656);
    let loc8 = new LocalisationFloue(2.48175,48.3676);
    let loc9 = new LocalisationFloue(2.22175,48.2256);
    let loc10 = new LocalisationFloue(2.45175,48.4556);

    let objet = [new ObjetPerdu('clés', loc1),
                new ObjetTrouve('téléphone', loc),
                new ObjetTrouve('carte bancaire', loc2),
                new ObjetTrouve('carte navigo', loc3),
                new ObjetTrouve('téléphone', loc4),
                new ObjetTrouve('clés', loc5),
                new ObjetPerdu('téléphone', loc6),
                new ObjetPerdu('sac', loc7),
                new ObjetPerdu('airpods', loc8),
                new ObjetPerdu('lunettes', loc9),
                new ObjetPerdu('clés', loc10)];

    return JSON.stringify(objet)
}

module.exports = {creationTableauObjet};