const User = require("../models/user.model");

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
        await User.create(req.body);
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
                id: req.params.id
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
        await User.destroy({
            where: {
                id: req.params.id
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