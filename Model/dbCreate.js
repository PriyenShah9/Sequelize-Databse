const Sequelize = require('sequelize');



const sequelize = new Sequelize('sequelize-test', 'root', 'qwertyuiop', { //change database name, username, password based on local device
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
})

try {
    sequelize.authenticate();
    console.log('DatabseConnection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


module.exports = sequelize;

