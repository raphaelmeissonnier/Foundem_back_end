var express = require('express');
var router = express.Router();
var AjoutObjetTrouve = require('../src/AjoutObjetTrouve');
var main = require("../src/Main");

const sanitizeHtml = require('sanitize-html');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/objets/:longitude/:latitude', function(req, res, next) {
  console.log("longitude back",parseFloat(req.params.longitude))
  console.log("latitude back",parseFloat(req.params.latitude))
  res.send(main.affichageObjetProche(parseFloat(req.params.longitude),parseFloat(req.params.latitude)));
});

router.post('/localisation', function(req, res, next) {
  res.send(main.createPositionUser(req.body.longitude,req.body.latitude));
  console.log(main.createPositionUser(req.body.longitude,req.body.latiztude));

});

router.post('/ajoutObjetTrouve', function(req, res, next)
{
  res.send(main.ajoutObjetTrouve(sanitizeHtml(req.body.intitule), sanitizeHtml(req.body.description), sanitizeHtml(req.body.categorie), sanitizeHtml(req.body.date), req.body.longitude, req.body.latitude, sanitizeHtml(req.body.adresseMail)));
  console.log(main.ajoutObjetTrouve(req.body.intitule, req.body.description, req.body.categorie, req.body.date, req.body.longitude, req.body.latitude, req.body.adresseMail));
});

module.exports = router;
