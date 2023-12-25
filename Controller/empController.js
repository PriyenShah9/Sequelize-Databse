const validator = require('validator');

const Emp = require('../Model/employeeModel');


const empController = {


    getAllEmployees: async (req, res) => {
        try {
            const employees = await Emp.findAll();
            res.json(employees);
          } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
          }
        
    },

    getEmployeeById: async (req, res) => {
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
    },

    createEmployee: async (req, res) => {
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
    },



    updateEmployee: async (req, res) => {
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
    },
    
    
    
    deleteEmployee: async (req, res) => {
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
    },

}

module.exports = empController;
