import axios from 'axios';

const baseRequest = axios.create({
    baseURL: 'https://localhost:7228/api/v1/',
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});

class employeeRequests {
    /**
     * Lấy tất cả danh sách nhân viên
     * Author: NQDONG (10/11/2022)
     * @returns Danh sách nhân viên
     */
    getAll() {
        return baseRequest.get('Employees');
    }

    /**
     * Lấy danh sách nhân viên theo bộ lọc và phân trang
     * Author: NQDONG (10/11/2022)
     * @param {Object} paging Bộ lọc và phân trang
     * @param {String} employeeId ID đưa lên đầu danh sách
     * @returns Danh sách nhân viên theo bộ lọc và phân trang
     */
    getByFilterAndPaging(paging, employeeId = '') {
        return baseRequest.get(
            `Employees/filter?pageSize=${paging.pageSize}&pageNumber=${paging.pageNumber}&keyword=${paging.keyword}&sort=${paging.sort}&ids=${employeeId}`,
        );
    }

    /**
     * Lấy thông tin 1 nhân viên theo ID
     * Author: NQDONG (10/11/2022)
     * @param {String} employeeId ID nhân viên
     * @returns Thông tin 1 nhân viên theo ID
     */
    getByID(employeeId) {
        return baseRequest.get(`Employees/${employeeId}`);
    }

    /**
     * Lấy mã nhân viên lớn nhất
     * Author: NQDONG (10/11/2022)
     * @returns Mã nhân viên lớn nhất
     */
    getBiggestCode() {
        return baseRequest.get(`Employees/maxRecord`);
    }

    /**
     * Kiểm tra mã nhân viên có trùng không
     * Author: NQDONG (10/11/2022)
     * @param {String} employeeCode Mã nhân viên
     * @param {String} employeeId ID nhân viên
     * @returns True/False
     */
    checkDuplicateCode(employeeCode, employeeId = '') {
        return baseRequest.get(
            `Employees/checkDuplicateCode?recordCode=${employeeCode}&recordID=${employeeId}`,
        );
    }

    /**
     * Thêm 1 nhân viên
     * Author: NQDONG (10/11/2022)
     * @param {String} data Thông tin 1 nhân viên cần thêm
     * @returns Status code
     */
    insert(data) {
        return baseRequest.post('Employees', data);
    }

    /**
     * Sửa 1 nhân viên theo ID
     * Author: NQDONG (10/11/2022)
     * @param {String} data Thông tin 1 nhân viên cần sửa
     * @returns Status code
     */
    update(data) {
        return baseRequest.put(`Employees/${data.EmployeeID}`, data);
    }

    /**
     * Xóa 1 nhân viên theo ID
     * Author: NQDONG (10/11/2022)
     * @param {String} employeeId ID nhân viên
     * @returns Status code
     */
    delete(employeeId) {
        return baseRequest.delete(`Employees/${employeeId}`);
    }

    /**
     * Xóa nhiều nhân viên theo ID
     * Author: NQDONG (10/11/2022)
     * @param {String} employeeId Danh sách ID nhân viên
     * @returns Status code
     */
    deleteMultiple(employeeIDs) {
        return baseRequest.post('Employees/deleteBatch', { employeeIDs: employeeIDs });
    }

    /**
     * Xuất file excel danh sách nhân viên
     * Author: NQDONG (10/11/2022)
     * @returns File danh sách nhân viên
     */
    exportToExcel(paging, employeeId = '') {
        // return baseRequest.get(`Employees/exportAllRecord`, {
        //     responseType: 'blob',
        // });

        return baseRequest.get(
            `Employees/exportAllRecord?pageSize=${paging.pageSize}&pageNumber=${paging.pageNumber}&keyword=${paging.keyword}&sort=${paging.sort}&ids=${employeeId}`, { responseType: 'blob' },
        );
    }
}

export default new employeeRequests();