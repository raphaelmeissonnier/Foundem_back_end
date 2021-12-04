const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const saltRounds=10
const salt = bcrypt.genSalt(saltRounds);

// Get all Users
const getUsers = async (req,res) => {
    try {
        const users = await User.findAll();
        res.send(users);
    }catch(err){
        console.log(err);
    }
}

// Get objet perdu by id
const getUserById = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                id: req.params.id
            }
        });
        res.send(user[0]);
    } catch (err) {
        console.log(err);
    }
}

// Create a new objet perdu
const createUser = async (req, res) => {
    try {
        await User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password, 

        });
        
        res.json({
            "message": "User Created"
        });
    } catch (err) {
        console.log(err);
    }
}

// Update objet perdu by id
const updateUser= async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                idUser: req.params.id
            }
        });
        res.json({
            "message": "User Updated"
        });
    } catch (err) {
        console.log(err);
    }
}
 
// Delete objet perdu by id
const deleteUser = async (req, res) => {
    try {
        console.log(req.params);
        await User.destroy({
            where: {
                idUser: req.params.id
            }
        });
        res.json({
            "message": "User Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {getUserById,getUsers,deleteUser,createUser,updateUser}