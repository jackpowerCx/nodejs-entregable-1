const express = require('express');

//middlewares
const { repairStatus } = require('../middlewares/repairsMiddlewares')
const { creatRepairValitions, checkVlidations } = require('../middlewares/validationsMiddlewares');
const { portectToken, protectEmployee } = require('../middlewares/usersMiddlewares');

//controllers
const { getAllRepairs, creatRepair, searchIdrepairs, cancelledRepair, updateRepair } = require('../controllers/repairsController');

const router = express.Router();


router.use(portectToken);


router.post('/', creatRepairValitions, checkVlidations, creatRepair);

router.get('/', protectEmployee,getAllRepairs);
router.get('/:id', protectEmployee,repairStatus, searchIdrepairs);
router.delete('/:id', protectEmployee, repairStatus, cancelledRepair);
router.patch('/:id',protectEmployee, repairStatus, updateRepair);

module.exports = { repairsRouter: router }