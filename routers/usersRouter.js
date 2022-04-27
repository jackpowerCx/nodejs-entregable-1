const express = require('express');

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
    .post(creatUser);

router
    .route('/:id')
    .get(searchIdUser)
    .patch(updateUser)
    .delete(deletUser);

module.exports = { usersRouter: router }
