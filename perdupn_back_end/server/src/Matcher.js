var Main = require ("./Main")
const IMatcher = require('./IMatcher');


class Matcher extends IMatcher{

    constructor(evaluation){

       super(evaluation)
    }

    matching(intitule, categorie, date, longitude, latitude){
        super.matching(intitule, categorie, date, longitude, latitude)
    }
}

module.exports = Matcher;