const Sequelize = require('sequelize');
const sequelize = require('../Model/dbCreate');


const City = sequelize.define('city', {
    CityId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CityName: {

        type: Sequelize.DataTypes.STRING,
        allowNull : false
    },
    StateId: {
        type: Sequelize.DataTypes.INTEGER,
        
    }

})


City.sync( { force: true } ).then((data) => {
    console.log("table added");

}).catch((err) => {
    console.log("error syncing table");

})

module.exports = City;