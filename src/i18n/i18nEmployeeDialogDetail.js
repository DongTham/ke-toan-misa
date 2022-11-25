const employeeDialogDetail = (EmployeeCode) => ({
    ConfirmDelete: {
        TitleHeader: 'Xóa nhân viên?',
        Message: `Bạn có thực sự muốn xóa Nhân viên <${EmployeeCode}> không?`,
        IconContent: 'warning-icon',
        ConfirmButton: 'Có',
        CancelButton: 'Không',
        Type: 'delete',
    },
});

export { employeeDialogDetail };