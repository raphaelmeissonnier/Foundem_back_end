const express = require("express");
// Import cors
const cors = require("cors");
// Import connection
const db = require("./app/config/database.js");
// Import router
const RouterObjetPerdu = require("./app/routes/objetsperdu");
const RouterObjetTrouve = require("./app/routes/objetstrouve");
const RouterUser = require("./app/routes/user");
 
// Init express
const app = express();
// use express json
app.use(express.json());
// use cors
app.use(cors());
 
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
  await db.sync({ force: true });
  console.log("The table model were just (re)created!");
}

connectionDB();
synchroDB_Model();
 
// use router
app.use(RouterUser);
app.use(RouterObjetPerdu);
app.use(RouterObjetTrouve);
 
// listen on port
app.listen(3001, () => console.log('Server running at http://localhost:3001'));