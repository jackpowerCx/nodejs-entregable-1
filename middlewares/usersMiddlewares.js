const jwt = require('jsonwebtoken');

const { Users } = require('../models/userModel');

const { catchAllAsync} = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { user } = require('pg/lib/defaults');



const userExists = catchAllAsync ( async (req, res, next) => {
    
    const { id } = req.params;

    const user = await Users.findOne({
      where: { id, status: 'active' },
      attributes: { exclude: ['password'] },
    });
  
  
    if (!user) {
      return next(new AppError('User does not exist with given Id', 404));
    }
  
    req.user = user;
    next();

});

const portectToken = catchAllAsync(async (req, res, next)=>{

    let token ;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

    token = req.headers.authorization.split(' ')[1];
    
  };

  if (!token) {
    return next(new AppError('session invalid', 403));
  };
   
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await Users.findOne({ where: { id: decoded.id, status: 'active' } });
  
    if (!user) {
      return next(new AppError('The owner of this token is no longer available', 403))
    };
    
    req.sessionUser = user;
    next();
});

const protectUser = catchAllAsync(async(req, res, next)=>{
  if(req.sessionUser.id !== req.user.id){
    return next(new AppError('Access not granted', 403));
  }

  next();
});

const protectEmployee = catchAllAsync(async (req, res, next) => {

 if (req.sessionUser.role !== 'employee') {
    return next(new AppError('Access not granted', 403));
  }
  
  next();
});




module.exports = { userExists, portectToken, protectEmployee,protectUser };