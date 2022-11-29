import axios from 'axios';

const employeeRequest = axios.create({
    baseURL: 'https://localhost:7228/api/v1/Employees/',
});
const departmentRequest = axios.create({
    baseURL: 'https://localhost:7228/api/v1/Departments/',
});

export { employeeRequest, departmentRequest };