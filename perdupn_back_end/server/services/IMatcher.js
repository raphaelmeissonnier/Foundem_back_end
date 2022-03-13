var haversine = require("haversine-distance")
var Main = require("./Main")

class IMatcher{

    /* Cette fonction permet de faire matcher un objet perdu avec une collection d'objets trouvés.
    Elle renvoie un tableau d'objets trouvés.
    */
    matching(tabObjet, intitule, categorie, date, longitude, latitude){
        //Longitude et latitude récupérées sont des string
        const pointObjetPerdu = {lat: parseFloat(latitude), lng: parseFloat(longitude)};

        //On récupère la collection d'objets
        var mapObjets=tabObjet;

        var mapObjetsTrouve= new Array();
        var intitule_reg=new RegExp(intitule,"gmi")
        var cptVal=0;

        //La date récupérée est un string
        var tDate = new Date(date);

        //On parcourt la collection des objets ....
        for(var i=0; i<mapObjets.length; i++)
        {
            // ... si un objet dans cette collection est un objet trouvé alors on procède au matching
            if(mapObjets[i].getCategorie()==categorie){
                cptVal+=4;
            }
            if(mapObjets[i].getIntitule().match(intitule_reg)){
                cptVal+=2;
            }
            //On récupère la position de l'objet trouvé
            var d1=mapObjets[i].getLocalisation();
            var d2= d1.getPosition();
            var rayon=10; //en KM
            var pointObjetTrouve = { lat: d2.getLatitude(), lng: d2.getLongitude() }

            //Cette formule permet de calculer la distance entre l'objet perdu et le ième objet trouvé
            var distance = (haversine(pointObjetPerdu, pointObjetTrouve))/1000; //Results in meters (default)

            if(distance < rayon)
            {
                cptVal+=3;
            }



            if(Main.differenceDate(tDate,mapObjets[i].getDate())<15){

                cptVal+=1
            }

            /*Si l'évaluation des critères dépasse la note de 6 points alors
            l'objet trouvé est suceptible d'être celui recherché par l'utilisateur
            */
            if(cptVal>=6){
                mapObjetsTrouve.push(mapObjets[i]);
            }
            console.log("\n\nSCORE :",cptVal);
            cptVal=0;
        }
        return JSON.stringify([...mapObjetsTrouve]);

    }
}
module.exports = IMatcher;