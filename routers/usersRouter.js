const express = require('express');

//Middlewares
const { userExists } = require('../middlewares/usersMiddlewares')

const { creatUserValidations, checkVlidations } = require('../middlewares/validationsMiddlewares')
//Controllers
const {
    getAllUsers,
    creatUser,
    searchIdUser,
    updateUser,
    deletUser } = require('../controllers/usersController');


const router = express.Router();

router
    .route('/')
    .get(getAllUsers)
    .post(
        creatUserValidations, checkVlidations,
        creatUser);

router
    .route('/:id')
    .get(userExists, searchIdUser)
    .patch(userExists, updateUser)
    .delete(userExists, deletUser);

module.exports = { usersRouter: router }
