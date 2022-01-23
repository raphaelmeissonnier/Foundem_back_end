class RendezVous
{
    constructor(date_rdv, localisation_precise, user_perdu, user_trouve){
        try{
            this.date=date_rdv;
            this.localisation=localisation_precise;
            this.user_perdu = user_perdu;
            this.user_trouve = user_trouve;
        }
        catch(err){
            console.log(err);
            throw 'LES PARAMETRES FOURNIT NE SONT PAS BONS !'
        }

    }

    getDateRdv(){
        return this.date;
    }

    getLocaRdv(){
        return this.localisation;
    }

    getUserPerdu(){
        return this.user_perdu;
    }

    getUserTrouve(){
        return this.user_trouve;
    }

}

module.exports = RendezVous;