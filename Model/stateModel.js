const Sequelize = require('sequelize');
const sequelize = require('../Model/dbCreate');


const State = sequelize.define('state', {
    StateId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    StateName: {

        type: Sequelize.DataTypes.STRING,
        allowNull : false
    },
    CountryId: {
        type: Sequelize.DataTypes.INTEGER,
        
    }

})


State.sync( { force: true } ).then((data) => {
    console.log("table added");

}).catch((err) => {
    console.log("error syncing table");

})

module.exports = State;