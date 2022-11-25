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