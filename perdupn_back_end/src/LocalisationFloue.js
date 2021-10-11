const Localisation = require("./Localisation");


class LocalisationFloue extends Localisation {

    constructor(position, rayon){
        if(typeof(rayon) === 'number')
        {
            super(position);
            this.rayon = rayon;
        }
    }

    getPosition(){
        return super.getPosition();
    }

    getRayon(){
        return this.rayon;
    }
}

module.exports = LocalisationFloue