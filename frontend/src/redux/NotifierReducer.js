/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
};

const notifierReducer = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    enqueueToast(state, action) {
      state.notifications.push(action.payload);
    },
    processToast(state) {
      state.notifications.splice(0, 1);
    },
  },
});

export const { enqueueToast, processToast } = notifierReducer.actions;

export default notifierReducer.reducer;
