const Localisation = require("./Localisation");


class LocalisationPrecise extends Localisation {

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

module.exports = LocalisationPrecise