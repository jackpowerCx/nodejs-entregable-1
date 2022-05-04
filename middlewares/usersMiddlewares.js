const { Users } = require('../models/userModel');

const userExists = async (req, res, next) => {
    try {
        const { id } = req.params;
        const searchId = await Users.findByPk(id);

        if (!searchId) {
            return res.status(404).json({
                status: 'error',
                message: 'user not found give that id'
            });
        }
        req.searchId= searchId;
        next();
    } catch (error) {
        console.log(error);

    }

};


module.exports = { userExists };