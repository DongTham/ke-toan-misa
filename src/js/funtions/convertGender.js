/**
 * convert giới tính từ số sang chữ
 * @param {Number} gender Giới tính
 * @returns Giới tính định dạng chữ
 * Author: NQDONG (10/11/2022)
 */
const convertGenderVietNamese = (gender) => {
    switch (gender) {
        case 0:
            return 'Nam';
        case 1:
            return 'Nữ';
        case 2:
            return 'Khác';
        default:
            return gender;
    }
};

export { convertGenderVietNamese };