import axios from 'axios';

const baseRequest = axios.create({
    baseURL: 'https://localhost:7228/api/v1/',
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});

class departmentRequests {
    /**
     * Lấy danh sách tất cả đơn vị
     * Author: NQDONG (10/11/2022)
     * @returns Danh sách đơn vị
     */
    getAll() {
        return baseRequest.get('Departments');
    }
}

export default new departmentRequests();