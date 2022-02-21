import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
};

const notifier = createSlice({
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

export const { enqueueToast, processToast } = notifier.actions;

export default notifier.reducer;
