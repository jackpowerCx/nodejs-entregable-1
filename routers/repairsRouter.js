const express = require('express');

//middlewares
const { repairStatus } = require('../middlewares/repairsMiddlewares')
const { creatRepairValitions, checkVlidations } = require('../middlewares/validationsMiddlewares');
//controllers
const { getAllRepairs, creatRepair, searchIdrepairs, cancelledRepair, updateRepair } = require('../controllers/repairsController');

const router = express.Router();

router.get('/', getAllRepairs);
router.post('/', creatRepairValitions, checkVlidations, creatRepair);
router.get('/:id', repairStatus, searchIdrepairs);
router.delete('/:id', repairStatus, cancelledRepair);
router.patch('/:id', repairStatus, updateRepair);

module.exports = { repairsRouter: router }