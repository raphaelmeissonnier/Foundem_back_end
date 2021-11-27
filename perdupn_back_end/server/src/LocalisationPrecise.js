const Localisation = require("./Localisation");


class LocalisationPrecise extends Localisation {

    constructor(position){
        super(position);
    }

    getPosition(){
        return super.getPosition();
    }
}

module.exports = LocalisationPrecise
