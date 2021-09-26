
const LocalisationPrecise = require('../src/LocalisationPrecise');
var express = require('express');
var router = express.Router();
var localisation = new LocalisationPrecise(5454,6565);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: 1, username: "Raphael Meissonnier"},
    {id: 2, username: "Fatimata Soumare"},
    {id: 3, username: "Rizlane Abalil"},
    {id: 4, username: "Imane Kadi"}
  ]);
});

router.get('/test', function(req, res, next) {
  res.json([
    {longitude: `${localisation.getLongitude()}`},
    {latitude: `${localisation.getLatitude()}`}
  ]);
});


module.exports = router;
