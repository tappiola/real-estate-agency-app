import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface NavigationState {
  scrollOffset: number,
}

const initialState: NavigationState = {
  scrollOffset: 0,
};

const navigation = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    saveScrollPosition(state, action: PayloadAction<number>) {
      state.scrollOffset = action.payload;
    }
  },
});

export const { saveScrollPosition } = navigation.actions;

export default navigation.reducer;
