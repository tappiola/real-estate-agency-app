/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ToastTypes } from '../constants';
import { login, register } from '../graphql/queries';
import { getSavedToken } from '../util';
import { enqueueToast } from './notifier';

interface UserState {
    authToken: string | null,
    isAuthorized: boolean,
}

const initialState: UserState = {
    authToken: getSavedToken(),
    isAuthorized: !!getSavedToken()
};

export interface LoginUserPayload {
    email: string,
    password: string,
}

export const loginUser = createAsyncThunk(
    'currentUser/loginUser',
    async ({ email, password } : LoginUserPayload, { dispatch, rejectWithValue }) => {
        try {
            const result = await login(email, password);

            if (!result.login.success) {
                dispatch(enqueueToast({
                    message: result.login.errorMessage,
                    type: ToastTypes.Error
                }));

                return rejectWithValue(result);
            }

            dispatch(enqueueToast({
                message: 'Login successful',
                type: ToastTypes.Success
            }));

            return result;
        } catch (e) {
            dispatch(enqueueToast({
                message: `Critical error: ${e.message}`,
                type: ToastTypes.Error
            }));

            return rejectWithValue(e.message);
        }
    }
);

export interface RegisterUserPayload {
    email: string,
    name: string,
    password: string,
}

export const registerUser = createAsyncThunk(
    'currentUser/registerUser',
    async (userInput : RegisterUserPayload, { dispatch, rejectWithValue }) => {
        try {
            const result = await register(userInput);

            if (!result.createUser.success) {
                dispatch(enqueueToast({
                    message: result.createUser.errorMessage,
                    type: ToastTypes.Error
                }));

                return rejectWithValue(result);
            }

            return result;
        } catch (e) {
            dispatch(enqueueToast({
                message: `Critical error has happened: ${e.message}`,
                type: ToastTypes.Error
            }));

            return rejectWithValue(e.message);
        }
    }
);

const user = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        logoutUser(state) {
            state.isAuthorized = false;
            state.authToken = null;

            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            const { login: { token } } = action.payload || {};

            if (!token) {
                return;
            }

            state.isAuthorized = true;
            state.authToken = token;

            localStorage.setItem('token', token);
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.isAuthorized = false;
        });
    }
});

export const { logoutUser } = user.actions;

export default user.reducer;
