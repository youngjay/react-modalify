export const setStyle = (element, styles) => {
    Object.assign(element.style, styles);
};

export const mixDeep = (a, b) => {
    if (b === undefined) {
        return a;
    }
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        return Object.keys(a).concat(Object.keys(b)).reduce((ret, key) => {
            ret[key] = mixDeep(a[key], b[key]);
            return ret;
        }, {});
    }
    return b;
};
