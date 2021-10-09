var express = require('express');
var router = express.Router();

var main = require("../src/Main");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/objets', function(req, res, next) {
  res.send(main.creationTableauObjet());
});

router.post('/localisation', function(req, res, next) {
  res.send(main.creationLocationUser(req.body.longitude,req.body.latitude));
  console.log(main.creationLocationUser(req.body.longitude,req.body.latitude));

});

module.exports = router;
