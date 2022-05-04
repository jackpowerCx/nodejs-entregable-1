const { Users } = require('../models/userModel');

//Utils
const { catchAllAsync } = require('../utils/catchAsync')

const getAllUsers = catchAllAsync(async (req, res, next) => {

    const users = await Users.findAll();
    res.status(200).json({
        users,
    });

});

const creatUser = catchAllAsync(async (req, res, next) => {

    const { name, email, password, role } = req.body;
    const newUser = await Users.create({ name, email, password, role });
    res.status(201).json({ newUser })

});

const searchIdUser = catchAllAsync(async (req, res, next) => {

    res.status(200).json({ searchId });

});

const updateUser = catchAllAsync(async (req, res, next) => {

    const { id } = req.params;
    const { name, email, password, role, status } = req.body;

    const user = await Users.findOne({ where: { id } });

    if (!user) {
        return res.status(404).json({ status: 'error', message: 'user not found give that id' })
    }
    await user.update({ name, email, password, role, status });

    res.status(200).json({ status: 'success' });

});

const deletUser = catchAllAsync(async (req, res, next) => {


    await user.update({ status: 'deleted' });
    res.status(200).json({ status: 'success' });


});

module.exports = { getAllUsers, creatUser, searchIdUser, updateUser, deletUser };