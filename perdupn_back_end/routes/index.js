var express = require('express');
var router = express.Router();
var AjoutObjetTrouve = require('../src/AjoutObjetTrouve');
var main = require("../src/Main");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/objets/:longitude/:latitude/:rayon', function(req, res, next) {
  console.log("longitude back",parseFloat(req.params.longitude))
  console.log("latitude back",parseFloat(req.params.latitude))
  console.log("rayon back",parseFloat(req.params.rayon))
  res.send(main.affichageObjetProche(parseFloat(req.params.longitude),parseFloat(req.params.latitude), parseFloat(req.params.rayon)));
});

router.get('/objets/:longitude/:latitude', function(req, res, next) {
  console.log("longitude back",parseFloat(req.params.longitude))
  console.log("latitude back",parseFloat(req.params.latitude))
  res.send(main.suggestionObjetPerdu(parseFloat(req.params.longitude),parseFloat(req.params.latitude)));
});

router.post('/localisation', function(req, res, next) {
  res.send(main.createPositionUser(req.body.longitude,req.body.latitude));
  console.log(main.createPositionUser(req.body.longitude,req.body.latitude));
});

router.post('/ajoutObjetTrouve', function(req, res, next)
{
  res.send(main.ajoutObjetTrouve(req.body.intitule, req.body.description, req.body.categorie, req.body.date, req.body.longitude, req.body.latitude, req.body.adresseMail));
  console.log(main.ajoutObjetTrouve(req.body.intitule, req.body.description, req.body.categorie, req.body.date, req.body.longitude, req.body.latitude, req.body.adresseMail));
});

router.get('/chercherObjetPerdu/:intitule/:categorie/:date/:longitude/:latitude', function(req, res, next) {
  res.send(main.chercherObjetPerdu(req.params.intitule, req.params.categorie, req.params.date, req.params.longitude, req.params.latitude));
  console.log(main.chercherObjetPerdu(req.params.intitule, req.params.categorie, req.params.date,req.params.longitude,req.params.latitude));
});

router.post('/ajoutObjetPerdu', function(req, res, next) {
  res.send(main.ajoutObjetPerdu(req.body.intitule, req.body.description, req.body.categorie, req.body.date, req.body.longitude, req.body.latitude, req.body.adresseMail, req.body.rayon));
  console.log(main.ajoutObjetPerdu(req.body.intitule, req.body.description, req.body.categorie, req.body.date, req.body.longitude, req.body.latitude, req.body.adresseMail, req.body.rayon));
});

module.exports = router;
