const express = require('express');

const { getAllRepairs, creatRepair, searchIdrepairs, cancelledRepair, updateReapir } = require('../controllers/repairsController');

const router = express.Router();

router.get('/', getAllRepairs);
router.post('/', creatRepair);
router.get('/:id', searchIdrepairs);
router.delete('/:id', cancelledRepair);
router.patch('/:id', updateReapir);

module.exports = { repairsRouter: router }