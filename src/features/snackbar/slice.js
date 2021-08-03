import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { updateDeliveryAreas } from 'features/user/deliveryAreas/deliveryAreasSlice';

import STATUS_CODE from 'common/constants';

const initialState = { statusCode: 0, statusMessage: '', count: 0 };

const slice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setStatusRequest(state, action) {
      state.statusCode = STATUS_CODE.REQUEST;
      state.statusMessage = action.payload;
      state.count = state.count + 1;
    },
    setStatusError(state, action) {
      state.statusCode = STATUS_CODE.ERROR;
      state.statusMessage = action.payload;
      state.count = state.count + 1;
    },
    setStatusSuccess(state, action) {
      state.statusCode = STATUS_CODE.SUCCESS;
      state.statusMessage = action.payload;
      state.count = state.count + 1;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(updateDeliveryAreas.fulfilled), (state, action) => {
      state.statusCode = STATUS_CODE.SUCCESS;
      state.statusMessage = action.payload;
      state.count = state.count + 1;
    });
    builder.addDefaultCase((state, action) => {
      if (action.type.endsWith('/rejected')) {
        state.statusCode = STATUS_CODE.ERROR;
        state.statusMessage = action.error.message;
        state.count = state.count + 1;
      }
    });
  },
});

export const { setStatusRequest, setStatusError } = slice.actions;
export default slice.reducer;
