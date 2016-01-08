export Transition from './Transition'
export TransitionElement from './TransitionElement'
export TransitionOverlay from './TransitionOverlay'
export TransitionStack from './TransitionStack'
export ModalFactory from './ModalFactory'

import ModalFactory from './ModalFactory'

const defaultModalFactory = new ModalFactory({
    duration: 300,
    container: document.body
});

export const modalify = (Component, modalStyles) => {
    return defaultModalFactory.create(Component, modalStyles);
};
