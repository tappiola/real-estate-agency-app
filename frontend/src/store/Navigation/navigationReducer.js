import * as actionTypes from './actionTypes';

const initialState = {
    scrollOffset: 0
};

const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_SCROLL_POSITION:
            return {
                ...state,
                scrollOffset: action.payload.scrollOffset
            };
        // case actionTypes.INIT_TASKS:
        //     console.log('fetch tasks');
        //     return {
        //         ...state,
        //         tasks: action.payload.tasks,
        //         isTasksFetching: false
        //     };
        // case actionTypes.CLEAR_PROJECTS_AND_TASKS:
        //     return {
        //         ...state,
        //         tasks: [],
        //         projects: []
        //     };
        // case actionTypes.FB_ERROR:
        //     return {
        //         ...state,
        //         error: action.payload.error
        //     };
        // case actionTypes.SUCCESS:
        //     return {
        //         ...state,
        //         successMessage: action.payload.message
        //     };
        // case actionTypes.SUCCESS_DISAPPEAR:
        //     return {
        //         ...state,
        //         successMessage: null
        //     }
        // case actionTypes.FB_ERROR_DISMISS:
        //
        //     return {
        //         ...state,
        //         error: null
        //     }
        // case actionTypes.SUCCESS_DISMISS:
        //
        //     return {
        //         ...state,
        //         successMessage: null
        //     }
        default:
            return state;
    }
}

export default navigationReducer;
