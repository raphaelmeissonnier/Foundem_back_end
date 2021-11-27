// Import express
const express = require("express");
// Import Product Controller
const { 
    getUsers,
    getUserById,
    updateUser,
    createUser,
    deleteUser
 } = require("../controllers/user.controller");

  // Init express router
const router = express.Router();

router.get('/users',getUsers);

router.get('/users/:id',getUserById);

router.post('/users', createUser);

router.put('/users/:id',updateUser);

router.delete('users/:id', deleteUser);

module.exports = router;