/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Config = {
    isMobile: boolean
};

const initialState: Config = {
    isMobile: false
};

const config = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setIsMobile(state, action: PayloadAction<boolean>) {
            state.isMobile = action.payload;
        }
    }
});

export const { setIsMobile } = config.actions;

export default config.reducer;
