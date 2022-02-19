import * as actionTypes from "./actionTypes";

export const initUser = () => {
    return dispatch => {
        const authToken = localStorage.getItem('token');
        dispatch(setUser(authToken));
    };
};

export const setUser = authToken => {
    return {
        type: actionTypes.SET_USER,
        payload: {authToken}
    };
}