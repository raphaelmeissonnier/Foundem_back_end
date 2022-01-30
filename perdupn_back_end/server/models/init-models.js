var DataTypes = require("sequelize").DataTypes;
var _categorie = require("./categorie");
var _historique = require("./historique");
var _listerecompenses = require("./listerecompenses");
var _localisation = require("./localisation");
var _objet = require("./objet");
var _objetmatche = require("./objetmatche");
var _recompense = require("./recompense");
var _rendezvous = require("./rendezvous");
var _utilisateur = require("./utilisateur");

function initModels(sequelize) {
  var categorie = _categorie(sequelize, DataTypes);
  var historique = _historique(sequelize, DataTypes);
  var listerecompenses = _listerecompenses(sequelize, DataTypes);
  var localisation = _localisation(sequelize, DataTypes);
  var objet = _objet(sequelize, DataTypes);
  var objetmatche = _objetmatche(sequelize, DataTypes);
  var recompense = _recompense(sequelize, DataTypes);
  var rendezvous = _rendezvous(sequelize, DataTypes);
  var utilisateur = _utilisateur(sequelize, DataTypes);

  objet.belongsTo(categorie, { as: "categorie_categorie", foreignKey: "categorie"});
  categorie.hasMany(objet, { as: "objets", foreignKey: "categorie"});
  historique.belongsTo(listerecompenses, { as: "liste_recompense_listerecompense", foreignKey: "liste_recompense"});
  listerecompenses.hasMany(historique, { as: "historiques", foreignKey: "liste_recompense"});
  objet.belongsTo(localisation, { as: "localisation_localisation", foreignKey: "localisation"});
  localisation.hasMany(objet, { as: "objets", foreignKey: "localisation"});
  rendezvous.belongsTo(localisation, { as: "localisation_localisation", foreignKey: "localisation"});
  localisation.hasMany(rendezvous, { as: "rendezvous", foreignKey: "localisation"});
  objetmatche.belongsTo(objet, { as: "objet_trouve_objet", foreignKey: "objet_trouve"});
  objet.hasMany(objetmatche, { as: "objetmatches", foreignKey: "objet_trouve"});
  objetmatche.belongsTo(objet, { as: "objet_perdu_objet", foreignKey: "objet_perdu"});
  objet.hasMany(objetmatche, { as: "objet_perdu_objetmatches", foreignKey: "objet_perdu"});
  rendezvous.belongsTo(objetmatche, { as: "objet_matche_objetmatche", foreignKey: "objet_matche"});
  objetmatche.hasMany(rendezvous, { as: "rendezvous", foreignKey: "objet_matche"});
  listerecompenses.belongsTo(recompense, { as: "id_recompense_recompense", foreignKey: "id_recompense"});
  recompense.hasMany(listerecompenses, { as: "listerecompenses", foreignKey: "id_recompense"});
  historique.belongsTo(rendezvous, { as: "rdv_rendezvou", foreignKey: "rdv"});
  rendezvous.hasMany(historique, { as: "historiques", foreignKey: "rdv"});
  historique.belongsTo(utilisateur, { as: "id_utilisateur_trouveur_utilisateur", foreignKey: "id_utilisateur_trouveur"});
  utilisateur.hasMany(historique, { as: "historiques", foreignKey: "id_utilisateur_trouveur"});
  listerecompenses.belongsTo(utilisateur, { as: "id_utilisateur_utilisateur", foreignKey: "id_utilisateur"});
  utilisateur.hasMany(listerecompenses, { as: "listerecompenses", foreignKey: "id_utilisateur"});
  objet.belongsTo(utilisateur, { as: "utilisateur_utilisateur", foreignKey: "utilisateur"});
  utilisateur.hasMany(objet, { as: "objets", foreignKey: "utilisateur"});
  rendezvous.belongsTo(utilisateur, { as: "first_user_utilisateur", foreignKey: "first_user"});
  utilisateur.hasMany(rendezvous, { as: "rendezvous", foreignKey: "first_user"});
  rendezvous.belongsTo(utilisateur, { as: "second_user_utilisateur", foreignKey: "second_user"});
  utilisateur.hasMany(rendezvous, { as: "second_user_rendezvous", foreignKey: "second_user"});

  return {
    categorie,
    historique,
    listerecompenses,
    localisation,
    objet,
    objetmatche,
    recompense,
    rendezvous,
    utilisateur,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
