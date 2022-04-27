const { Repairs } = require('../models/repairModel');


const getAllRepairs = async (req, res) => {
    const repairs = await Repairs.findAll();
    res.status(200).json({
        repairs,
    });
};

const creatRepair = async (req, res) => {
    try {
        const { date, userId } = req.body;
        const newRepair = await Repairs.create({ date, userId });

        res.status(201).json({ newRepair });

    } catch (error) {
        console.log(error)
    }
};

const searchIdrepairs = async (req, res) => {
    try {
        const searchId = await Repairs.findByPk(req.params.id);
        if (!searchId) {
            return res.status(404).json({ status: 'error', message: 'user not found give that id' })
        } else if (searchId.status != "pending") {
            return res.status(404).json({
                status: 'error',
                message: 'user with status cancelled'
            });
        }
        res.status(200).json({ searchId });

    } catch (error) {
        console.log(error)
    }
};

const updateReapir = async (req, res) => {

    try {
        const { id } = req.params;
        const { status } = req.body;

        const repair = await Repairs.findOne({ where: { id } });
        console.log(repair.status)
        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: 'user not found give that id'
            });
        } else if (repair.status === "cancelled") {
            return res.status(404).json({
                status: 'error',
                message: 'user not found give that id'
            });
        }
        await repair.update({ status });
        res.status(200).json({ status: 'succes' });
    } catch (error) {
        console.log(error);
    }
};

const cancelledRepair = async (req, res) => {
    try {
        const { id } = req.params;
        const repair = await Repairs.findOne({ where: { id } })
        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: 'repair not found give that id'
            });
        }
        await repair.update({ status: 'cancelled' });
        res.status(200).json({ status: 'success' });

    } catch (error) {
        console.log(error);
    }
};

module.exports = { getAllRepairs, creatRepair, searchIdrepairs, updateReapir, cancelledRepair };