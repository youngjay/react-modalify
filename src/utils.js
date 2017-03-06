export const setStyle = (element, styles) => {
    Object.assign(element.style, styles);
};

export const mix = (a, b) => {
    return Object.assign({}, a, b)
}
