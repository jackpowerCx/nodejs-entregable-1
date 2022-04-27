const { Sequelize } = require('sequelize');


/*const db = new Sequelize({
    dialect: 'postgres', 
    host: 'localhost',    
    username: 'postgres', 
    password: '1234567',
    database: 'db repair',
    logging: false 
});*/

const db = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '1234567',
    database: 'db_1',
    logging: false
});
module.exports = { db };