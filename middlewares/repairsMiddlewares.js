const { Repairs } = require('../models/repairModel');

const repairExists = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const repair = await Repairs.findOne({ where: { id } });

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
        await repair.update({ status })
        req.repair=repair;
        next();
    } catch (error) {
        console.log(error);
    }
};


const repairStatus = async (req, res, next) => {
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
        req.searchId = searchId;
        next();

    } catch (error) {
        console.log(error)
    }
};
module.exports = { repairStatus, repairExists};