import * as actionTypes from './actionTypes';

const initialState = {
    authToken: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                authToken: action.payload.authToken
            };
        default:
            return state;
    }
}

export default userReducer;
