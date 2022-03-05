import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ToastTypes} from '../constants';
import {login} from "../queries";
import {getSavedToken} from '../util';
import {enqueueToast} from './notifier';

interface UserState {
    authToken: string | null,
    isAuthorized: boolean,
}

const initialState: UserState = {
    authToken: getSavedToken(),
    isAuthorized: !!getSavedToken(),
};

interface LoginUserPayload {
    email: string,
    password: string,
}

export const loginUser = createAsyncThunk(
  'currentUser/loginUser',
  async ({ email, password } : LoginUserPayload, { dispatch }) => {
    const response = await login(email, password)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Something went wrong',
          type: ToastTypes.Error,
        }));

        throw err;
      });

    dispatch(enqueueToast({
      message: 'Login successful',
      type: ToastTypes.Success,
    }));

    return response.json();
  },
);

export const logoutUser = createAsyncThunk(
  'currentUser/logoutUser',
  async (arg, { dispatch }) => {
      localStorage.removeItem('token');
  },
);

const user = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            const { data: {login: {token}} } = action.payload || {};
            state.isAuthorized = true;
            state.authToken = token;
            localStorage.setItem('token', token);
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.isAuthorized = false;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isAuthorized = false;
            state.authToken = null;
        });
    },
});

export default user.reducer;

