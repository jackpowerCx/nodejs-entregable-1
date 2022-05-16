const express = require('express');

//Middlewares
const { 
    userExists,
    portectToken,
    protectUser,
    } = require('../middlewares/usersMiddlewares')

const { creatUserValidations, checkVlidations } = require('../middlewares/validationsMiddlewares');

//Controllers
const {
    getAllUsers,
    creatUser,
    searchIdUser,
    updateUser,
    login,
    deletUser } = require('../controllers/usersController');


const router = express.Router();

router
    .route('/')
    .get(getAllUsers)
    .post(
        creatUserValidations, checkVlidations,
        creatUser);

router
        .post('/login', login);



router
    .route('/:id')
    .get(userExists, searchIdUser);


router.use(portectToken);

router
    .route('/:id')
    .patch(userExists,protectUser, updateUser)
    .delete(userExists,protectUser, deletUser);

module.exports = { usersRouter: router }
