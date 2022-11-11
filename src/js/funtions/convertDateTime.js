import moment from 'moment';

const customizeDateTime = function(date, formatString = 'DD/MM/YYYY') {
    return date ? moment(date).format(formatString) : date;
};

export { customizeDateTime };