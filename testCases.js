
const axios = require('axios');

var moment = require('moment');
const date = new Date();

const createEmployee = async () => {
  try {
    const response = await axios.post('http://localhost:3000/employees', {
      EmpID: 5,
      FirstName: "John",
      LastName: "Doe",
      Email: "john.doe@example.com",
      Mobile: "1234567890",
      CountryID: 1,
      StateID: 2,
      CityID: 3,
      Password: 'qwertyuiop',
      Img: 'testImageURL'
      
    });

    console.log('API Response:', response.data);
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
  }
};

createEmployee();


const getAllEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/employees');
      console.log('All Employees:', response.data);
    } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error.message);
    }
  };
  
getAllEmployees();
