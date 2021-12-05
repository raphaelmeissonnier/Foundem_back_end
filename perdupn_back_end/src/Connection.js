const Sequelize = require("sequelize");

const sequelize = new Sequelize('FoundEm', 'root', 'root',{

    host: 'localhost',
    //port: '3000',
    dialect: 'mysql'

})

async function myFunction(){
    await sequelize.authenticate();
    console.log("Connection successful");

}
myFunction();



console.log("Autre tache");