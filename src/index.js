import ModalFactory from './ModalFactory'

export {ModalFactory}

const defaultModalFactory = new ModalFactory();

export const modalify = (Component, modalStyles) => {
    return defaultModalFactory.create(Component, modalStyles);
};