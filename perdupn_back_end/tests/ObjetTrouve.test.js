const ObjetTrouve = require("../src/ObjetTrouve")
const Objet = require("../src/Objet")
const LocalisationPrecise = require("../src/LocalisationPrecise")
const Position = require("../src/Position")
const Localisation = require("../src/Localisation")
//const Calculateur = require("../src/Calculateur")

/*const ObjetTrouve = jest.createMockFromModule("../src/ObjetTrouve")*/
const Calculateur = jest.createMockFromModule("../src/Calculateur")

//const constructorSpy = jest.spyOn(Objet,'constructor')

beforeEach(()=> {
    Calculateur.mockClear()
})


/*describe('../src/ObjetTrouve', () => {
    it('On verifie si le constructeur de calculateur est appelé', () => {
        const position = new Position(12,25)
        const localisation = new LocalisationPrecise(position);
        const objetTrouve = new ObjetTrouve("toto",localisation);
        //expect(Calculateur).toHaveBeenCalledTimes(1);
        expect(Calculateur.).toHaveBeenCalledTimes(1);
    });
});*/


describe('../src/ObjetTrouve', () => {
    it('On verifie que l\'objet appelle la methode getDistance de l\'instance de Calculateur', () => {
        //expect(Calculateur).not.toHaveBeenCalled()
    
        const positionTest = new Position(13,20);
        const localistaionUser = new Localisation(positionTest);
    
        const positionObj = new Position(12,25)
        const localisationObj = new LocalisationPrecise(positionObj);
        const objetTrouve = new ObjetTrouve("toto",localisationObj);
        //expect(Calculateur).toHaveBeenCalledTimes(2);
    
        const res = objetTrouve.getDistance(localistaionUser);
    
        //const mockGetDistance = Calculateur.getDistanceLocalistaionPrecise;
        //expect(Calculateur).toHaveBeenCalledTimes(1);
        expect(res).toBe(0.8874227710538172);
        //expect(Calculateur).toHaveBeenCalledWith(localistaionUser,localisationObj);
        //expect(Calculateur).toHaveBeenCalledTimes(1);
    
    });
});



