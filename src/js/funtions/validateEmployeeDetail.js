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