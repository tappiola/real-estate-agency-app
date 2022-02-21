import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer, { enqueueToast } from './redux/NotifierReducer';

import { TOAST_TYPES } from './constants';

const errorHandler = (store) => (next) => (action) => {
  if (action?.error?.message === 'Forbidden') {
    store.dispatch(enqueueToast({
      type: TOAST_TYPES.ERROR,
      message: 'You are not authorized',
    }));
  }

  return next(action);
};

const store = configureStore({
  reducer: {
    notifications: notificationsReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), errorHandler],
});

export default store;
