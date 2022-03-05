import {configureStore} from '@reduxjs/toolkit';
import navigationReducer from './Navigation';
import notificationsReducer from './Notifier';
import userReducer from './User';

// TODO: Remove this, because it's not used
// const errorHandler = (store) => (next) => (action) => {
//
//   if (action?.error?.message === 'Forbidden') {
//     store.dispatch(enqueueToast({
//       type: ToastTypes.Error,
//       message: 'You are not authorized',
//     }));
//   }
//
//   return next(action);
// };

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    navigation: navigationReducer,
    user: userReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
