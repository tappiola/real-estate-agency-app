import * as actionTypes from "./actionTypes";
import {searchProperties2} from "../../queries";

export const tokenSelector = (state) => state.user.authToken;

export const queryProperties = (currentPage) => {
    return async (dispatch, getState) => {
        const token = tokenSelector(getState());
        console.log(token);
        const response = await searchProperties2(currentPage, token);
        const {data: {getProperties: {items, pages, count}}} = await response.json();
        dispatch(setProperties(items));
    };
};

export const setProperties = items => {
    return {
        type: actionTypes.SEARCH_PROPERTIES,
        payload: {items}
    };
}