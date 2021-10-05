
class User{
    constructor(props){
        this.state = {
            latitude: null,
            longitude: null
        };

        this.getLocalisation = this.getLocalisation.bind(this)
        this.getCoordinates = this.getCoordinates.bind(this)
        /*if(typeof locUser === 'object'){ //On verifie que la localisation fournit est bien de type Localisation
            this.locUser=locUser
        }*/        
    }

    

    getLocalisation(){ // Retourne la localisation de l'user
        var geoPos;
        if(global.navigator.geolocation){
            geoPos=global.navigator.geolocation.getCurrentPosition(this.getCoordinates)
        }
        else{
            alert("Proble pour la loc")
        }
        return geoPos;
    }

    getCoordinates(position){
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }

    distanceObjetUser(locObjet){ // Calcul la distance entre la localisation de l'user et la localisation d'un objet
        if(typeof locObjet === 'object'){
            function toRad(x){
                return x * Math.PI/180;
            }

            var longitudeUser=this.locUser.getLongitude();
            var latitudeUser=this.locUser.getLatitude();

            var longitudeObjet=this.locObjet.getLongitude();
            var latitudeObjet=this.locObjet.getLatitude();

            var rayon= 10; //en Km

            var latitudeDis= latitudeObjet-latitudeUser;
            var dLat= toRad(latitudeDis);
            var longitudeDis= longitudeObjet-longitudeUser;
            var dLong= toRad(longitudeDis);

            var a= Math.sin(dLat/2)* Math.sin(dLat/2) +
                    Math.cos(toRad(latitudeUser)) * Math.cos(toRad(latitudeObjet)) *
                    Math.sin(dLong/2) * Math.sin(dLong/2);
                    
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = rayon * c;

            return d;
        }
    }
}

module.exports = User