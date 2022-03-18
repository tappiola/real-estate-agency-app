import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './search';
import notificationsReducer from './notifier';
import userReducer from './user';
import referenceDataReducer from './referenceData';
import configReducer from './config';

const store = configureStore({
    reducer: {
        notifier: notificationsReducer,
        referenceData: referenceDataReducer,
        search: searchReducer,
        user: userReducer,
        config: configReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
