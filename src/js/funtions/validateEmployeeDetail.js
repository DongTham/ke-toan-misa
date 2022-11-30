/**
 * Validate dữ liệu cho mã nhân viên
 * @param {String} employeeCode Mã nhân viên
 * @returns Object chứa Title và isShow
 * Author: NQDONG (10/11/2022)
 */
const validateCode = (employeeCode) => {
    if (employeeCode == 'Duplicate') {
        return { Title: 'Mã bị trùng!', IsShow: true };
    } else if (employeeCode.trim() == '') {
        return { Title: 'Mã không được để trống!', IsShow: true };
    } else if (!employeeCode.match(/(NV)(\d+)/)) {
        return { Title: 'Mã không đúng định dạng (VD: NV001)', IsShow: true };
    } else {
        return { IsShow: false };
    }
};

/**
 * Validate dữ liệu cho tên nhân viên
 * @param {String} employeeName Tên nhân viên
 * @returns true/false
 * Author: NQDONG (10/11/2022)
 */
const validateName = (employeeName) => {
    if (employeeName == null) {
        return true;
    } else {
        if (employeeName.trim() == '') {
            return true;
        } else {
            return false;
        }
    }
};

/**
 * Validate dữ liệu cho tên đơn vị
 * @param {String} departmentName Tên đơn vị
 * @param {Array} departmentsList Danh sách đơn vị
 * @returns Object chứa Title và isShow
 * Author: NQDONG (10/11/2022)
 */
const validateDepartment = (departmentName, departmentsList) => {
    if (departmentName == null) {
        return { IsShow: true };
    } else {
        if (departmentName.trim() == '') {
            return { Title: 'Đơn vị không được để trống!', IsShow: true };
        } else if (!departmentsList.some((el) => el.DepartmentName.includes(departmentName))) {
            return { Title: 'Đơn vị không đúng!', IsShow: true };
        } else {
            return { IsShow: false };
        }
    }
};

/**
 * Validate dữ liệu cho ngày sinh
 * @param {String} dateOfBirth Ngày sinh
 * @returns true/false
 * Author: NQDONG (10/11/2022)
 */
const validateDateOfBirth = (dateOfBirth) => {
    if (dateOfBirth) {
        let currentDate = new Date().getTime();
        let DateOfBirth = Date.parse(dateOfBirth);
        if (DateOfBirth > currentDate) {
            return true;
        } else {
            return false;
        }
    }
};

/**
 * Validate dữ liệu cho ngày cấp
 * @param {String} identityIssueDate Ngày cấp
 * @returns true/fasle
 * Author: NQDONG (10/11/2022)
 */
const validateIdentityIssueDate = (identityIssueDate) => {
    if (identityIssueDate) {
        let currentDate = new Date().getTime();
        let DateOfBirth = Date.parse(identityIssueDate);
        if (DateOfBirth > currentDate) {
            return true;
        } else {
            return false;
        }
    }
};

/**
 * Validate dữ liệu cho email
 * @param {String} employeeCode Email
 * @returns true/false
 * Author: NQDONG (10/11/2022)
 */
const validateEmail = (email) => {
    if (email) {
        if (!email.match(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+)((\.[a-zA-Z0-9-]{1,5})+)$/)) {
            return true;
        } else {
            return false;
        }
    }
};

export {
    validateCode,
    validateName,
    validateDepartment,
    validateDateOfBirth,
    validateIdentityIssueDate,
    validateEmail,
};