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

const sidebarMenu = [{
        Title: 'Tổng quan',
        ClassButton: 'btn-icon menu__button-icon overview-icon',
    },
    {
        Title: 'Tiền mặt',
        ClassButton: 'cash-icon',
        Class: 'active',
    },
    {
        Title: ' Tiền gửi',
        ClassButton: 'deposits-icon',
    },
    {
        Title: 'Mua hàng',
        ClassButton: 'purchase-icon',
    },
    {
        Title: 'Bán hàng',
        ClassButton: 'sell-icon',
    },
    {
        Title: 'Quản lý hóa đơn',
        ClassButton: 'invoice-icon',
    },
    {
        Title: 'Kho',
        ClassButton: 'warehouse-icon',
    },
    {
        Title: 'Công cụ dụng cụ',
        ClassButton: 'tools-icon',
    },
    {
        Title: 'Tài sản cố định',
        ClassButton: 'asset-icon',
    },
    {
        Title: 'Thuế',
        ClassButton: 'tax-icon',
    },
    {
        Title: 'Giá thành',
        ClassButton: 'price-icon',
    },
    {
        Title: 'Tổng hợp',
        ClassButton: 'synthetic-icon',
    },
    {
        Title: 'Ngân sách',
        ClassButton: 'budget-icon',
    },
    {
        Title: 'Báo cáo',
        ClassButton: 'report-icon',
    },
    {
        Title: 'Phân tích tài chính',
        ClassButton: 'finance-icon',
    },
];

export { selectPageSize };
export { headerTableName };
export { titleEmployeeDetails };
export { sidebarMenu };