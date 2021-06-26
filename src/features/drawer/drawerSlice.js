import { createSlice } from '@reduxjs/toolkit';

const initialState = { width: 200, widthChanged: false };

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setWidth(state, action) {
      state.width = action.payload;
      state.widthChanged = true;
    },
    disableWidthChanged(state) {
      state.widthChanged = false;
    },
  },
});

export const { setWidth, disableWidthChanged } = drawerSlice.actions;
export default drawerSlice.reducer;
