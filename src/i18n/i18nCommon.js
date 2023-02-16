import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();

const sidebarMenu = [{
        Title: 'Tổng quan',
        ClassButton: 'btn-icon menu__button-icon overview-icon',
        Tooltip: 'Tổng quan',
    },
    {
        Title: 'Tiền mặt',
        ClassButton: 'cash-icon',
        Class: 'active',
        Tooltip: 'Tiền mặt',
    },
    {
        Title: 'Tiền gửi',
        ClassButton: 'deposits-icon',
        Tooltip: 'Tiền gửi',
    },
    {
        Title: 'Mua hàng',
        ClassButton: 'purchase-icon',
        Tooltip: 'Mua hàng',
    },
    {
        Title: 'Bán hàng',
        ClassButton: 'sell-icon',
        Tooltip: 'Bán hàng',
    },
    {
        Title: 'Quản lý hóa đơn',
        ClassButton: 'invoice-icon',
        Tooltip: 'Quản lý hóa đơn',
    },
    {
        Title: 'Kho',
        ClassButton: 'warehouse-icon',
        Tooltip: 'Kho',
    },
    {
        Title: 'Công cụ dụng cụ',
        ClassButton: 'tools-icon',
        Tooltip: 'Công cụ dụng cụ',
    },
    {
        Title: 'Tài sản cố định',
        ClassButton: 'asset-icon',
        Tooltip: 'Tài sản cố định',
    },
    {
        Title: 'Thuế',
        ClassButton: 'tax-icon',
        Tooltip: 'Thuế',
    },
    {
        Title: 'Giá thành',
        ClassButton: 'price-icon',
        Tooltip: 'Giá thành',
    },
    {
        Title: 'Tổng hợp',
        ClassButton: 'synthetic-icon',
        Tooltip: 'Tổng hợp',
    },
    {
        Title: 'Ngân sách',
        ClassButton: 'budget-icon',
        Tooltip: 'Ngân sách',
    },
    {
        Title: 'Báo cáo',
        ClassButton: 'report-icon',
        Tooltip: 'Báo cáo',
    },
    {
        Title: 'Phân tích tài chính',
        ClassButton: 'finance-icon',
        Tooltip: 'Phân tích tài chính',
    },
];

const showToast = (msg = 'Thao tác thành công!', type = 'success') => {
    $toast.open({
        message: msg,
        type: type,
        position: 'top-right',
    });
};

const toastMessage = {
    DeleteSuccess: {
        Msg: 'Xóa nhân viên thành công!',
        Type: 'success',
    },
    DeleteBatchSuccess: {
        Msg: 'Xóa nhiều nhân viên thành công!',
        Type: 'success',
    },
    AddNewSuccess: {
        Msg: 'Thêm nhân viên thành công!',
        Type: 'success',
    },
    EditSuccess: {
        Msg: 'Sửa nhân viên thành công!',
        Type: 'success',
    },
};

export { sidebarMenu, toastMessage, showToast };