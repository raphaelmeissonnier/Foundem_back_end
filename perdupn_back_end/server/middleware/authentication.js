const jwt = require("jsonwebtoken");
const {config} = require("../config/config");
const db = require('../config/database');

const {Sequelize} = require('sequelize');
var DataTypes = Sequelize.DataTypes;
var user = require("../models/utilisateur");
var UserModel = user(db,DataTypes);


const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
          console.log("DecodedToken",decodedToken.id)
        let utilisateur = await UserModel.findOne({where : { id_utilisateur: decodedToken.id }});
        res.locals.user = utilisateur;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const requireAuth = (req, res, next) => {
  console.log("req.cookies: ", req.cookies.jwt);
  //Si l'utilisateur est connecté (existence d'un cookie de session jwt)
  if (req.cookies.jwt)
  {
    const token = req.cookies.jwt;
    //On vérifie que le token du cookie est bien celui de l'utilisateur connecté
    jwt.verify(token, config.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        next();
      }
    });
  }
  //Si l'utilisateur n'est pas connecté (pas de cookie de session)
  else
  {
    res.status(200).json("No tokens");
    console.log("No tokens");
  }
};


module.exports = {checkUser, requireAuth}