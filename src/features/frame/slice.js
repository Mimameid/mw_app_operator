import { createSlice } from '@reduxjs/toolkit';

const initialState = { drawerOpen: false };

const slice = createSlice({
  name: 'frame',
  initialState,
  reducers: {
    setDrawerOpen(state, action) {
      state.drawerOpen = action.payload;
    },
  },
});

export const { setDrawerOpen } = slice.actions;
export default slice.reducer;
