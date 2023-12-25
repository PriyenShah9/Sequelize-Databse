const express = require('express');
const bodyParser = require('body-parser');
const empController = require('../Sequelize-Databse/Controller/empController');


const app = express();
const port = 3000;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get('/employees', empController.getAllEmployees);
app.get('/employees/:id', empController.getEmployeeById);
app.post('/employees', empController.createEmployee);
app.put('/employees/:id', empController.updateEmployee);
app.delete('/employees/:id', empController.deleteEmployee);