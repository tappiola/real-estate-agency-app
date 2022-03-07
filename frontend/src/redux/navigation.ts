import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface NavigationState {
  scrollOffset: number,
  activeProperty: number
}

const initialState: NavigationState = {
  scrollOffset: 0,
  activeProperty: 0
};

const navigation = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    saveScrollPosition(state, action: PayloadAction<number>) {
      state.scrollOffset = action.payload;
    },
    setActiveProperty(state, action: PayloadAction<number>) {
      state.activeProperty = action.payload;
    }
  },
});

export const { saveScrollPosition, setActiveProperty } = navigation.actions;

export default navigation.reducer;
