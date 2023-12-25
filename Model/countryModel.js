const Sequelize = require('sequelize');
const sequelize = require('../Model/dbCreate');


const Country = sequelize.define('country', {
    CountryId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CountryName: {

        type: Sequelize.DataTypes.STRING,
        allowNull : false
    }

})

Country.sync( { force: true } ).then((data) => {
    console.log("table added");

}).catch((err) => {
    console.log("error syncing table");

})

module.exports = Country;
