import axios from 'axios';

/**
 * Khởi tạo http request cho employee
 * Author: NQDONG (10/11/2022)
 */
const employeeRequest = axios.create({
    baseURL: 'https://localhost:7228/api/v1/Employees/',
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});

/**
 * Khởi tạo http request cho department
 * Author: NQDONG (10/11/2022)
 */
const departmentRequest = axios.create({
    baseURL: 'https://localhost:7228/api/v1/Departments/',
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});

export { employeeRequest, departmentRequest };