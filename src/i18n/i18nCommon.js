const selectPageSize = [{
        Value: 10,
    },
    {
        Value: 20,
    },
    {
        Value: 30,
    },
    {
        Value: 50,
    },
    {
        Value: 100,
    },
];

const headerTableName = [{
        Id: 'EmployeeCode',
        Name: 'Mã nhân viên',
    },
    {
        Id: 'EmployeeName',
        Name: 'Tên nhân viên',
    },
    {
        Id: 'Gender',
        Name: 'Giới tính',
    },
    {
        Id: 'DateOfBirth',
        Name: 'Ngày sinh',
    },
    {
        Id: 'IdentityNumber',
        Name: 'Số CMND',
    },
    {
        Id: 'IdentityIssuePlace',
        Name: 'Nơi cấp',
    },
    {
        Id: 'DepartmentName',
        Name: 'Tên đơn vị',
    },
    {
        Id: 'BankAccountNumber',
        Name: 'Số tài khoản',
    },
    {
        Id: 'BankName',
        Name: 'Tên ngân hàng',
    },
    {
        Id: 'BankBranchName',
        Name: 'Chi nhánh TK ngân hàng',
    },
];

const titleEmployeeDetails = {
    EmployeeCode: 'Mã',
    EmployeeName: 'Tên',
    Gender: 'Giới tính',
    DateOfBirth: 'Ngày sinh',
    IdentityNumber: 'Số CMND',
    IdentityIssuePlace: 'Nơi cấp',
    IdentityIssueDate: 'Ngày cấp',
    Department: 'Đơn vị',
    JobPosition: 'Chức danh',
    EmployeeAddress: 'Địa chỉ',
    MobilePhone: 'ĐT di động',
    TelePhone: 'ĐT cố định',
    Email: 'Email',
    BankAccountNumber: 'Tài khoản ngân hàng',
    BankName: 'Tên ngân hàng',
    BankBranchName: 'Chi nhánh',
};

export { selectPageSize };
export { headerTableName };
export { titleEmployeeDetails };