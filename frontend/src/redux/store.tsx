import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer, { enqueueToast } from './Notifier';
import navigationReducer from './Navigation';

import {ToastTypes} from '../constants';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

// @ts-ignore
const errorHandler = (store) => (next) => (action) => {
  if (action?.error?.message === 'Forbidden') {
    store.dispatch(enqueueToast({
      type: ToastTypes.Error,
      message: 'You are not authorized',
    }));
  }

  return next(action);
};

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    navigation: navigationReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), errorHandler],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
