// Import express
const express = require("express");
// Import Product Controller
const { 
    getUsers,
    getUserById,
    updateUser,
    createUser,
    deleteUser,
    loginUser,
    logoutUser
 } = require("../controllers/user.controller");

  // Init express router
const router = express.Router();

router.get('/users',getUsers);

router.post('/users', createUser);

router.post('/users/login',loginUser);

router.get("/users/logout",logoutUser);

router.get('/users/:id',getUserById);

router.put('/users/:id',updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;