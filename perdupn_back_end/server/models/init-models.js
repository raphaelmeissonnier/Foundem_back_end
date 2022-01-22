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

  objet.belongsTo(categorie, { as: "categorie_categorie", foreignKey: "categorie", onDelete: 'CASCADE'});
  categorie.hasMany(objet, { as: "objets", foreignKey: "categorie", onDelete: 'CASCADE'});
  objet.belongsTo(localisation, {as: "localisation_localisation", foreignKey: "localisation", onDelete: 'CASCADE'});
  localisation.hasMany(objet, { as: "objets", foreignKey: "localisation", onDelete: 'CASCADE'});
  rendezvous.belongsTo(localisation, { as: "localisation_localisation", foreignKey: "localisation", onDelete: 'CASCADE'});
  localisation.hasMany(rendezvous, { as: "rendezvous", foreignKey: "localisation", onDelete: 'CASCADE'});
  historique.belongsTo(objet, { as: "id_objet_trouve_objet", foreignKey: "id_objet_trouve", onDelete: 'CASCADE'});
  objet.hasMany(historique, { as: "historiques", foreignKey: "id_objet_trouve", onDelete: 'CASCADE'});
  objetmatche.belongsTo(objet, { as: "objet_trouve_objet", foreignKey: "objet_trouve", onDelete: 'CASCADE'});
  objet.hasMany(objetmatche, { as: "objetmatches", foreignKey: "objet_trouve", onDelete: 'CASCADE'});
  objetmatche.belongsTo(objet, { as: "objet_perdu_objet", foreignKey: "objet_perdu", onDelete: 'CASCADE'});
  objet.hasMany(objetmatche, { as: "objet_perdu_objetmatches", foreignKey: "objet_perdu", onDelete: 'CASCADE'});
  listerecompenses.belongsTo(recompense, { as: "id_recompense_recompense", foreignKey: "id_recompense", onDelete: 'CASCADE'});
  recompense.hasMany(listerecompenses, { as: "listerecompenses", foreignKey: "id_recompense", onDelete: 'CASCADE'});
  historique.belongsTo(utilisateur, { as: "id_utilisateur_trouveur_utilisateur", foreignKey: "id_utilisateur_trouveur", onDelete: 'CASCADE'});
  utilisateur.hasMany(historique, { as: "historiques", foreignKey: "id_utilisateur_trouveur", onDelete: 'CASCADE'});
  listerecompenses.belongsTo(utilisateur, { as: "id_utilisateur_utilisateur", foreignKey: "id_utilisateur", onDelete: 'CASCADE'});
  utilisateur.hasMany(listerecompenses, { as: "listerecompenses", foreignKey: "id_utilisateur", onDelete: 'CASCADE'});
  objet.belongsTo(utilisateur, { as: "utilisateur_utilisateur", foreignKey: "utilisateur", onDelete: 'CASCADE', onDelete: 'CASCADE'});
  utilisateur.hasMany(objet, { as: "objets", foreignKey: "utilisateur", onDelete: 'CASCADE'});
  rendezvous.belongsTo(utilisateur, { as: "first_user_utilisateur", foreignKey: "first_user", onDelete: 'CASCADE'});
  utilisateur.hasMany(rendezvous, { as: "rendezvous", foreignKey: "first_user", onDelete: 'CASCADE'});
  rendezvous.belongsTo(utilisateur, { as: "second_user_utilisateur", foreignKey: "second_user", onDelete: 'CASCADE'});
  utilisateur.hasMany(rendezvous, { as: "second_user_rendezvous", foreignKey: "second_user", onDelete: 'CASCADE'});

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
