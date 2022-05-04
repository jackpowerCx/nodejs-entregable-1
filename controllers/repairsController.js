const { Repairs } = require('../models/repairModel');
const { Users } = require('../models/userModel');

const getAllRepairs = async (req, res) => {
    const repairs = await Repairs.findAll({
        include: [{ model: Users }],
    });
    res.status(200).json({
        repairs,
    });
};

const creatRepair = async (req, res) => {
    try {
        const { date, computerNumber, comments, userId } = req.body;
        const newRepair = await Repairs.create({ date, computerNumber, comments, userId });

        res.status(201).json({ newRepair });

    } catch (error) {
        console.log(error)
    }
};

const searchIdrepairs = async (req, res) => {
    try {
        res.status(200).json({ searchId });

    } catch (error) {
        console.log(error)
    }
};

const updateRepair = async (req, res) => {

    try {

        res.status(200).json({ status: 'success' });
    } catch (error) {
        console.log(error);
    }
};

const cancelledRepair = async (req, res) => {
    try {

        res.status(200).json({ status: 'success' });

    } catch (error) {
        console.log(error);
    }
};

module.exports = { getAllRepairs, creatRepair, searchIdrepairs, updateRepair, cancelledRepair };