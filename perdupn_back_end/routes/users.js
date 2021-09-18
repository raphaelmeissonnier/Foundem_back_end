var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: 1, username: "Raphael Meissonnier"},
    {id: 2, username: "Fatimata Soumare"},
    {id: 3, username: "Rizlane Abalil"},
    {id: 4, username: "Imane Kadi"}
  ]);
});

module.exports = router;
