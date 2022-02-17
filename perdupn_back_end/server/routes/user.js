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
    logoutUser,
    getRdvByUser,
    getAllRdvByUser,
    getHistByUser
 } = require("../controllers/user.controller");

const { 
  updateRdv
} = require("../controllers/rendezvous.controller");

  // Init express router
const router = express.Router();

router.get('/users',getUsers);

router.post('/users', createUser);

router.post('/users/login',loginUser);

router.get("/users/logout",logoutUser);

router.patch('/users/:id/rdv/:idrdv', updateRdv);

router.get('/users/:id',getUserById);

router.get('/users/:id/rdv', getRdvByUser);

router.get('/users/:id/rdv/count', getAllRdvByUser);

router.get('/users/:id/historique', getHistByUser);

router.put('/users/:id',updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;