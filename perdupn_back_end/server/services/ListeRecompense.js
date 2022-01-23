class ListeRecompense
{
    constructor(id_utilisateur, id_recompense, date_recompense){
        try{
            this.id_utilisateur=id_utilisateur;
            this.id_recompense=id_recompense;
            this.date_recompense = date_recompense;
        }
        catch(err){
            console.log(err);
            throw 'LES PARAMETRES FOURNIS NE SONT PAS BONS !'
        }

    }

    getUtilisateur(){
        return this.id_utilisateur;
    }

    getRecompense(){
        return this.id_recompense;
    }

    getDateRecompense(){
        return this.date_recompense;
    }

    /*Rizlane
    CETTE METHODE NE DEVRAIT AVOIR AUCUN PARAMETRE (les attributs doivent appeler les méthodes .getSolde et .getValeur pour pouvoir faire le calcul)
    SOLUTION TEMPORAIRE POUR ALLER PLUS VITE
     */
    verifier(solde_user, valeur_recompense)
    {
        let rtn = false;
        if(solde_user-valeur_recompense>=0)
        {
            rtn = true
        }
        return rtn;
    }

    soustraire(solde_user, valeur_recompese)
    {
        return solde_user-valeur_recompese;
    }
}

module.exports = ListeRecompense;