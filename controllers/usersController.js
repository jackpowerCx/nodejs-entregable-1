const { Users } = require('../models/userModel');


const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json({
            users,
        });
    } catch (error) {
        console.log(error)
    }
};

const creatUser = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;
        const newUser = await Users.create({ name, email, password, role });
        res.status(201).json({ newUser })
    } catch (error) {
        console.log(error)
    }
};

const searchIdUser = async (req, res) => {
    try {
        const searchId = await Users.findByPk(req.params.id);

        if (!searchId) {
            return res.status(404).json({ status: 'error', message: 'user not found give that id' })
        }
        res.status(200).json({ searchId });
    } catch (error) {
        console.log(error)
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role, status } = req.body;

        const user = await Users.findOne({ where: { id } });
        //const user = await Users.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ status: 'error', message: 'user not found give that id' })
        }
        await user.update({ name, email, password, role, status });

        res.status(200).json({ status: 'success' });

    } catch (error) {
        console.log(error);
    }
};

const deletUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findOne({ where: { id } })
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'user not found give that id'
            });
        }
        await user.update({ status: 'deleted' });
        res.status(200).json({ status: 'success' });

    } catch (error) {
        console.log(error);
    }
};
module.exports = { getAllUsers, creatUser, searchIdUser, updateUser, deletUser };