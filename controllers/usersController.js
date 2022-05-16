const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dontenv = require('dotenv');

//Models
const { Users } = require('../models/userModel');

//Utils
const { catchAllAsync } = require('../utils/catchAsync')

const login = catchAllAsync(async(req,res,next) => {
    
    const { email, password } = req.body;

    const user = await Users.findOne({where: {email, status:'active'}});

    if(!user || !(await bcrypt.compare(password, user.password))){
        return next(new AppError('Invalid credentials', 400));
    }

    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
    
      user.password = undefined;
    
      res.status(200).json({ token, user });
});

const getAllUsers = catchAllAsync(async (req, res, next) => {

    const users = await Users.findAll();
    res.status(200).json({
        users,
    });

});

const creatUser = catchAllAsync(async (req, res, next) => {

    const { name, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
  
    // INSERT INTO ...
    const newUser = await Users.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    newUser.password = undefined;
  
    res.status(201).json({ newUser });
  

});

const searchIdUser = catchAllAsync(async (req, res, next) => {
    const {user}= req;
    
    res.status(200).json({ user });

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

module.exports = { 
    login,
    getAllUsers, 
    creatUser, 
    searchIdUser, 
    updateUser, 
    deletUser 
};