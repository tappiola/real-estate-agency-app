/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSavedToken } from '../util';

interface UserState {
    authToken: string | null,
    isAuthorized: boolean,
}

const initialState: UserState = {
    authToken: getSavedToken(),
    isAuthorized: !!getSavedToken()
};

const user = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        loginSuccessful(state, action: PayloadAction<string>) {
            const token = action.payload;

            state.isAuthorized = true;
            state.authToken = token;

            localStorage.setItem('token', token);
        },
        loginFailed(state) {
            state.isAuthorized = false;
        },
        logoutUser(state) {
            state.isAuthorized = false;
            state.authToken = null;

            localStorage.removeItem('token');
        }
    }
});

export const { loginSuccessful, loginFailed, logoutUser } = user.actions;

export default user.reducer;
