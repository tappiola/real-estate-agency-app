import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './search';
import notificationsReducer from './notifier';
import userReducer from './user';
import referenceData from './referenceData';

const store = configureStore({
    reducer: {
        notifications: notificationsReducer,
        referenceData,
        search: searchReducer,
        user: userReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
