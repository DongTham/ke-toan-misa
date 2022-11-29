const employeeDialogDetail = (Data = {}) => ({
    ConfirmDelete: {
        TitleHeader: 'Xóa nhân viên?',
        Message: [`Bạn có thực sự muốn xóa Nhân viên <${Data.Code}> không?`],
        IconContent: 'warning-icon',
        ConfirmButton: 'Có',
        CancelButton: 'Không',
        Type: 'delete',
    },
    DuplicateEmployeeCode: {
        TitleHeader: 'Cảnh báo',
        Message: [`Mã nhân viên <${Data.Code}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`],
        IconContent: 'warning-icon',
        CancelButton: 'Đồng ý',
        Type: 'duplicate-code',
        Style: 'single-button footer-end',
    },
    ModifiedEmployee: {
        TitleHeader: 'Cất dữ liệu?',
        Message: ['Dữ liệu đã bị thay đổi. Bạn có muốn cất không?'],
        IconContent: 'confirm-icon',
        ConfirmButton: 'Có',
        UnConfirmButton: 'Không',
        CancelButton: 'Hủy',
        Type: 'modified-employee',
    },
    ConfirmDeleteMultiple: {
        TitleHeader: 'Xóa nhiều nhân viên?',
        Message: ['Bạn thật sự muốn xóa những nhân viên đã chọn không?'],
        IconContent: 'warning-icon',
        ConfirmButton: 'Có',
        CancelButton: 'Không',
        Type: 'delete-multiple',
    },
    ErrorValidate: {
        TitleHeader: 'Lỗi',
        Message: Data.Field,
        IconContent: 'error-icon',
        CancelButton: 'Đóng',
        Type: 'error-validate',
        Style: 'single-button',
    },
    ErrorPostData: {
        TitleHeader: 'Lỗi',
        Message: Data.Msg,
        IconContent: 'error-icon',
        CancelButton: 'Đóng',
        Type: 'error-post',
        Style: 'single-button',
    },
});

export { employeeDialogDetail };