import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ToastTypes} from "../constants";

type Notification = {
  message: string;
  type: ToastTypes
}

interface NotifierState {
  notifications: Notification[],
}

const initialState: NotifierState = {
  notifications: [],
};

const notifier = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    enqueueToast(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload);
    },
    processToast(state) {
      state.notifications.splice(0, 1);
    },
  },
});

export const { enqueueToast, processToast } = notifier.actions;

export default notifier.reducer;
