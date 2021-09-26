const Localisation = require("./Localisation");


class LocalisationFloue extends Localisation {

    constructor(parLongitude, parLatitude){
        super(parLongitude,parLatitude);
    }

    getLongitude(){
        return `${super.getLongitude()}`;
    }

    getLatitude(){
        return `${super.getLatitude()}`;
    }
}

module.exports = LocalisationFloue