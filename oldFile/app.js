const Sequelize = require('sequelize');
const express = require('express');

const validator = require('validator');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3000;
 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


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




Country.sync( { force: true } ).then((data) => {
    console.log("table added");

}).catch((err) => {
    console.log("error syncing table");

})

State.sync( { force: true } ).then((data) => {
    console.log("table added");

}).catch((err) => {
    console.log("error syncing table");

})

City.sync( { force: true } ).then((data) => {
    console.log("table added");

}).catch((err) => {
    console.log("error syncing table");

})

Emp.sync( { force: true } ).then((data) => {
    console.log("table added");

}).catch((err) => {
    console.log("error syncing table");

})

//READ ALL

app.get('/employees', async (req, res) => {
    try {
      const employees = await Emp.findAll();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// READ BY ID
app.get('/employees/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Emp.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//INSERT
app.post('/employees', async (req, res) => {
    try {
      
      const { FirstName, LastName, Email, Mobile, RegistrationDate, CountryID, StateID, CityID, Password, Img} = req.body;
  
      if (!FirstName || !LastName || !Email || !Mobile || !CountryID || !StateID || !CityID) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      
  
      if (!validator.isEmail(Email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
  
      if (!validator.isMobilePhone(Mobile)) {
        return res.status(400).json({ error: 'Invalid mobile format', Mobile});
      }
  
      if(RegistrationDate) {

        if (!validator.isDate(RegistrationDate)) {
            return res.status(400).json({ error: 'Invalid date format', RegistrationDate});

          
        }

      }

      
      req.body['Img'] = btoa(req.body['Img'])
      

      
  
      const createdEmployee = await Emp.create(req.body);
      res.json({ message: 'Employee created successfully', employee: createdEmployee });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//UPDATE
app.put('/employees/:id', async (req, res) => {
    
  
    const id = req.params.id;
    try {
      const [updatedCount] = await Emp.update(req.body, { where: { id } });
      if (updatedCount === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json({ message: 'Employee updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//DELETE
app.delete('/employees/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const deletedCount = await Emp.destroy({ where: { id } });
      if (deletedCount === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

