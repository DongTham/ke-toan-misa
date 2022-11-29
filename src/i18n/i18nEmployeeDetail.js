const titleEmployeeDetails = {
    EmployeeCode: 'Mã',
    EmployeeName: 'Tên',
    Gender: 'Giới tính',
    DateOfBirth: 'Ngày sinh',
    IdentityNumber: { Name: 'Số CMND', Tooltip: 'Số chứng minh nhân dân' },
    IdentityIssuePlace: 'Nơi cấp',
    IdentityIssueDate: 'Ngày cấp',
    Department: 'Đơn vị',
    JobPositionName: 'Chức danh',
    EmployeeAddress: 'Địa chỉ',
    MobilePhone: { Name: 'ĐT di động', Tooltip: 'Số điện thoại di động' },
    TelePhone: { Name: 'ĐT cố định', Tooltip: 'Số điện thoại cố định' },
    Email: 'Email',
    BankAccountNumber: 'Tài khoản ngân hàng',
    BankName: 'Tên ngân hàng',
    BankBranchName: 'Chi nhánh',
};

const handleActionEmployeeForm = {
    AddNew: { Title: 'THÊM MỚI NHÂN VIÊN', Action: 'Thêm' },
    Edit: { Title: 'THÔNG TIN NHÂN VIÊN', Action: 'Sửa' },
};

export { titleEmployeeDetails };
export { handleActionEmployeeForm };