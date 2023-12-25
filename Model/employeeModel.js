const Sequelize = require('sequelize');
const sequelize = require('../Model/dbCreate');


const Emp = sequelize.define('emp', {

    EmpId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    FirstName: {

        type: Sequelize.DataTypes.STRING,
        allowNull : false

    },
    LastName: {

        type: Sequelize.DataTypes.STRING,
        allowNull : false

    },
    Email: {

        type: Sequelize.DataTypes.STRING,
        allowNull : false

    },
    Mobile: {

        type: Sequelize.DataTypes.STRING,
        allowNull : false

    },
    Hobbies: {
        type: Sequelize.DataTypes.STRING
    },
    Gender: {
        type: Sequelize.DataTypes.STRING
    },
    RegistrationDate: {
        type: Sequelize.DataTypes.STRING,
        allowNull : true
    },
    CountryID: {

        type: Sequelize.DataTypes.INTEGER,
        allowNull: false

    },
    StateID: {

        type: Sequelize.DataTypes.INTEGER,
        allowNull: false

    },
    CityID: {

        type: Sequelize.DataTypes.INTEGER,
        allowNull: false

    },
    Password: {

        type: Sequelize.DataTypes.STRING,
        allowNull: true

    },
    Img: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true


    }


})


Emp.sync( { force: true } ).then((data) => {
    console.log("table added");

}).catch((err) => {
    console.log("error syncing table");

})




module.exports = Emp;