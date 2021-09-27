const { error } = require("console");

class Localisation{
    constructor(longitude, latitude){
        if((typeof(longitude)==='number') && (typeof(latitude)==='number')){
            this.longitude=longitude;
            this.latitude=latitude;
        }
        else{
            throw 'LES PARAMETRES FOURNIT NE SONT PAS BONS !'
        }
        
    }

    setLongitude(parLongitude){
        if(typeof(parLongitude)==='number'){
            this.longitude=parLongitude;
        }   
        else{
            throw 'LE PARAMETRE FOURNIT N\'EST PAS BON !'
        }
    }

    setLatitude(parLatitude){
        if(typeof(parLatitude)==='number'){
            this.latitude=parLatitude;
        }   
        else{
            throw 'LE PARAMETRE FOURNIT N\'EST PAS BON !'
        }
    }

    getLongitude(){
        return this.longitude;
    }

    getLatitude(){
        return this.latitude;
    }

}



module.exports = Localisation