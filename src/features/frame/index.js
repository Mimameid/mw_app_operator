import { createReducer } from '@reduxjs/toolkit';
import { setDrawerOpen } from './actions';

const initialState = { drawerOpen: false };

const frame = createReducer(initialState, (builder) =>
  builder.addCase(setDrawerOpen, (state, action) => {
    state.drawerOpen = action.payload;
  }),
);

export default frame;
