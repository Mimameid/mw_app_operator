import { createReducer } from '@reduxjs/toolkit';
import { fetchArea } from './actions';
import { STATUS_CODE } from 'common/constants';

const initialState = {
  statusCode: 0,
  statusMessage: '',
};

const plz = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchArea.rejected, (state, action) => {
      state.statusCode = STATUS_CODE.ERROR;
      state.errorMessage = action.error.message;
    })
    .addCase(fetchArea.pending, (state, action) => {
      state.statusCode = action.payload;
    })
    .addCase(fetchArea.fulfilled, (state, action) => {
      state.statusCode = action.payload;
      state.loggedIn = true;
    });
});

export default plz;
