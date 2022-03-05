import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer  from './Notifier';
import navigationReducer from './Navigation';
import userReducer from './User';

import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    navigation: navigationReducer,
    user: userReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
