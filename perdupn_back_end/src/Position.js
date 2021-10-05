class Position
{
    constructor(longitude, latitude){
        if((typeof(longitude)==='number') && (typeof(latitude)==='number')){
            this.longitude=longitude;
            this.latitude=latitude;
        }
        else{
            throw 'LES PARAMETRES FOURNIT NE SONT PAS BONS !'
        }

    }

    getLongitude(){
        return this.longitude;
    }

    getLatitude(){
        return this.latitude;
    }

}

module.exports = Position;