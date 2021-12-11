const jwt = require("jsonwebtoken");
const {UserModel} = require("../models/tables.model")
const {config} = require("../config/config");

checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
          console.log("DEcodedTOken",decodedToken.id)
        let user = await UserModel.findByPk(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

requireAuth = (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;

    jwt.verify(token, config.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        next();
      }
    });
  } else {
    console.log("No tokens");
  }
};


module.exports = {checkUser, requireAuth}