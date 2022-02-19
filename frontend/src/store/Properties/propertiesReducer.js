import * as actionTypes from './actionTypes';

const initialState = {
    items: []
};

const propertiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_PROPERTIES:
            return {
                ...state,
                items: action.payload.items
            };
        default:
            return state;
    }
}

export default propertiesReducer;
