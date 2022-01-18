const express = require("express");
// Import cors
const cors = require("cors");
// Import connection
const db = require("./server/config/database.js");
// Import router
//const RouterObjetPerdu = require("./server/routes/objetsperdu");
const RouterObjetTrouve = require("./server/routes/objetstrouve");
//const RouterObjetMatche = require("./server/routes/objetmatche");
const RouterUser = require("./server/routes/user");
const cookieParser = require("cookie-parser");

//Import Auth parts
//const {checkUser,requireAuth} = require("./server/middleware/authentication")
 
// Init express
const app = express();
// use express json
app.use(express.json());
// use cors
app.use(cors());
//use cookies-parser
app.use(cookieParser());

//app.use(checkUser);

/*app.get('/authId', requireAuth, (req, res) => {
  let id = res.locals.user
  res.status(200).send(id)
})*/
 
// Testing database connection 
async function connectionDB(){
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

async function synchroDB_Model(){
  await db.sync({ alter: true });
  console.log("The table model were just (re)created!");
}

connectionDB();
synchroDB_Model();
 
// use router
app.use(RouterUser);
//app.use(RouterObjetPerdu);
app.use(RouterObjetTrouve);
//app.use(RouterObjetMatche);

// listen on port
//app.listen(3001, () => console.log('Server running at http://localhost:3001'));

module.exports = app;