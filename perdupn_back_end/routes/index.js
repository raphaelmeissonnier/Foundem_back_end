var express = require('express');
var router = express.Router();

var main = require("../src/Main");

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
  console.log(main.createPositionUser(req.body.longitude,req.body.latitude));

});

router.post('/localisation', function(req, res, next) {
  res.send(main.creationLoc(req.body.longitude,req.body.latitude));
  console.log(main.creationLoc(req.body.longitude,req.body.latitude));

});

module.exports = router;
