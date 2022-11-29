const employeeDetailErrors = () => {
    return {
        EmployeeCode: { Title: 'Mã không được để trống!', IsShow: false, IsFocus: true },
        EmployeeName: { Title: 'Tên không được để trống!', IsShow: false, IsFocus: false },
        DepartmentName: { Title: 'Đơn vị không được để trống!', IsShow: false },
        DateOfBirth: { Title: 'Ngày sinh không được lớn hơn hiện tại!', IsShow: false },
        IdentityIssueDate: { Title: 'Ngày cấp không được lớn hơn hiện tại!', IsShow: false },
        Email: { Title: 'Email không đúng định dạng!', IsShow: false },
        Other: { Title: 'Có lỗi xảy ra! Vui lòng liên hệ với MISA.', IsShow: false },
    };
};

export { employeeDetailErrors };