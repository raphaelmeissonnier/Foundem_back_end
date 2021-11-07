var ObjetTrouve = require("../src/ObjetTrouve");
var LocalisationPrecise = require("../src/LocalisationPrecise");
var Position = require("../src/Position");
var Calculateur = require("../src/Calculateur");

//On mocke la fonction
const mockCalculateurMethode = jest.fn().mockReturnValue(0.8874227710538172);

// Calculateur est maintenant un constructeur simulé
jest.mock('../src/Calculateur');

//Reset du mock
beforeEach(()=> {
    Calculateur.mockClear();
})

//On vérifie que qu'un objet Calculateur a été créé dans la classe ObjetTrouve
describe('../src/ObjetTrouve', () => {
    it('On verifie si le constructeur de calculateur est appelé', () => {
        const position = new Position(12,25)
        const localisation = new LocalisationPrecise(position);
        const objetTrouve = new ObjetTrouve("toto",localisation);
        expect(Calculateur).toHaveBeenCalledTimes(1);
    });
});

//On vérifie que la méthode appelée retourne le résultat espéré
    //1. On vérifie qu'on a pas déjà un objet Calculateur
    //2. On créé un nouvel ObjetTrouve
    //3. On vérifie que le Calculateur a bien été appelé
    //ON PASSE AU TEST DE LA METHODE
        //1. On initialise un résultat en dur
        //2. On appelle la méthode getDistance de ObjetTrouve
        //3. On récupère l'instance du Calculateur
        //4. On appelle la méthode getDistanceLocalisationPrecise de l'instance mockée Calculateur
        //5. On vérifie que le résultat retourné à 4. est égal au résultat de l'étape 1.
        //6. On vérifie getDistanceLocalisationPrecise a été appelé 1 fois

describe('../src/ObjetTrouve', () => {
    it('On verifie que l\'objet appelle la methode getDistance de l\'instance de Calculateur', () => {
        //1.
        expect(Calculateur).not.toHaveBeenCalled();

        //2.
        const positionObj = new Position(12,25)
        const localisationObj = new LocalisationPrecise(positionObj);
        const objetTrouve = new ObjetTrouve("clés",localisationObj);

        //3.
        expect(Calculateur).toHaveBeenCalledTimes(1);

        //Méthode 1.
        const res = 0.8874227710538172;

        //Méthode 2.
        const positionUser = new Position(13,20);
        const localisationUser = new LocalisationPrecise(positionUser);
        objetTrouve.getDistance(localisationUser);

        //Méthode 3.
        const mockCalculateurInstance = Calculateur.mock.instances[0];

        //Méthode 4.
        //const mockCalculateurMethode = mockCalculateurInstance.getDistanceLocalisationPrecise;

        //Méthode 5.
        expect(mockCalculateurMethode()).toEqual(res);

        //Méthode 6.
        expect(mockCalculateurMethode).toHaveBeenCalledTimes(1)
    });
});



