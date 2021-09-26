class Localisation{
    constructor(longitude, latitude){
        this.longitude=longitude;
        this.latitude=latitude;
    }

    setLongitude(parLongitude){
        this.longitude=parLongitude;
    }

    setLatitude(parLatitude){
        this.latitude=parLatitude;
    }

    getLongitude(){
        return this.longitude;
    }

    getLatitude(){
        return this.latitude;
    }
}



module.exports = Localisation