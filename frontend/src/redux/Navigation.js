import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scrollOffset: 0,
};

const navigation = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    saveScrollPosition(state, action) {
      state.scrollOffset = action.payload;
    }
  },
});

export const { saveScrollPosition } = navigation.actions;

export default navigation.reducer;
