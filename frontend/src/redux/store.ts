import {configureStore} from '@reduxjs/toolkit';
import navigationReducer from './navigation';
import notificationsReducer from './notifier';
import userReducer from './user';

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
