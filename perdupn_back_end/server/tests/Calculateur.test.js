//Import les classes Localisation et Position
var LocalisationPrecise = require('../services/LocalisationPrecise');
var Position = require('../services/Position');
var Calculateur = require('../services/Calculateur');
var LocalisationFloue = require('../services/LocalisationFloue');

const calculateur = new Calculateur();

//On créé une localisation user
const positionUser = new Position(2.3488, 48.8534);
const localisationUser = new LocalisationPrecise(positionUser);

//On créé une localisation objet trouvé
const positionObjetTrouve = new Position(2.3488, 48.8534);
const localisationObjetTrouve = new LocalisationPrecise(positionObjetTrouve);

//On créé une localisation objet perdu
const positionObjetPerdu = new Position(2.3488, 48.8534);
const localisationObjetPerdu = new LocalisationFloue(positionObjetPerdu, 5);


//On teste la fonction getDistanceLocalisationPrecise (qui calcule la distance entre un user et un objet trouvé)
test('adds location user + location found objet expect to be 0', () => {
  expect(calculateur.getDistanceLocalisationPrecise(localisationUser, localisationObjetTrouve)).toBe(0);
});

//On teste la fonction getDistanceLocalisationFloue(qui calcule la distance entre un user et un objet perdu)
test('adds location user + location lost objet expect to be 0', () => {
  expect(calculateur.getDistanceLocalisationFloue(localisationUser, localisationObjetPerdu)).toBe(5);
});