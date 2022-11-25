const selectPageSize = [{
        Value: 10,
    },
    {
        Value: 25,
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
        Tooltip: '',
    },
    {
        Id: 'EmployeeName',
        Name: 'Tên nhân viên',
        Tooltip: '',
    },
    {
        Id: 'Gender',
        Name: 'Giới tính',
        Tooltip: '',
    },
    {
        Id: 'DateOfBirth',
        Name: 'Ngày sinh',
        Tooltip: '',
    },
    {
        Id: 'IdentityNumber',
        Name: 'Số CMND',
        Tooltip: 'Số chứng minh nhân dân',
    },
    {
        Id: 'IdentityIssuePlace',
        Name: 'Nơi cấp',
        Tooltip: '',
    },
    {
        Id: 'DepartmentName',
        Name: 'Tên đơn vị',
        Tooltip: '',
    },
    {
        Id: 'BankAccountNumber',
        Name: 'Số tài khoản',
        Tooltip: '',
    },
    {
        Id: 'BankName',
        Name: 'Tên ngân hàng',
        Tooltip: '',
    },
    {
        Id: 'BankBranchName',
        Name: 'Chi nhánh TK ngân hàng',
        Tooltip: 'Chi nhánh tài khoản ngân hàng',
    },
];

export { selectPageSize };
export { headerTableName };