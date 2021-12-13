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
        let user = await UserModel.findOne({where : { id: decodedToken.id }});
          //console.log("User: ", user);
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