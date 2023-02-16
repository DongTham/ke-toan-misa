import moment from 'moment';

/**
 * Convert định dạng ngày tháng năm
 * @param {Date} date Ngày nhập vào
 * @param {String} formatString Định dạng cần convert
 * @returns Ngày tháng đã convert
 * Author: NQDONG (10/11/2022)
 */
const customizeDateTime = function(date, formatString = 'DD/MM/YYYY') {
    return date ? moment(date).format(formatString) : date;
};

export { customizeDateTime };