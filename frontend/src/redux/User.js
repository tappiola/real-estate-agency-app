import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueToast } from './Notifier';
import jwtDecode from 'jwt-decode';

import { ToastTypes } from '../constants';
import {getSavedToken} from '../graphql';
import {login} from "../queries";

const initialState = {
  isAuthorized: !!getSavedToken(),
};

export const loginUser = createAsyncThunk(
  'currentUser/loginUser',
  async ({ email, password }, { dispatch }) => {
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
  async () => localStorage.removeItem('token'),
);

export const refreshTokenIfExpired = createAsyncThunk(
  'currentUser/updateToken',
  async () => {
    const lsToken = getSavedToken();

    if (lsToken) {
      const { exp } = jwtDecode(lsToken);

      if (exp && exp > Date.now()) {
          console.log('refresh');
          // TODO refresh api
        // const { updateToken } = await api.updateToken();
        // localStorage.setItem('token', updateToken);
      }
    }
  },
);

const user = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {},
    extraReducers: {
        [loginUser.fulfilled]: (state, action) => {
          const { data: {login: {userId, token}} } = action.payload || {};
          state.isAuthorized = true;
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
        },
        [loginUser.rejected]: (state) => {
          state.isAuthorized = false;
        },
        [logoutUser.fulfilled]: (state) => {
          state.isAuthorized = false;
        },
  },
});

export default user.reducer;

