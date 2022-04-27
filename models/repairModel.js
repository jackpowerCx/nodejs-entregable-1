const { DataTypes } = require('sequelize');
const { db } = require('../utils/dataBase');


const Repairs = db.define('repair', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    userId: {
        type: DataTypes.INTEGER,    
        allowNull: false
    }
});
module.exports = { Repairs }
