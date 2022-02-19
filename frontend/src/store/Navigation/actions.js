import * as actionTypes from './actionTypes';

// TODO USE IT!!!!!!!!!!!!
// export const initTasks = () => {
//     return (dispatch, getState) => {
//         firebaseActions.fetchTasks(data => dispatch(setTasks(data)), userIdSelector(getState()))
//     };
// };

export const saveScrollPosition = scrollOffset => {
    return {
        type: actionTypes.SAVE_SCROLL_POSITION,
        payload: {scrollOffset}
    };
}
