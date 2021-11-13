import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchArea, updateAreas } from 'features/deliveryAreas/areas/actions';

import { STATUS_CODE } from 'common/constants';
import { updateShop } from 'features/shop/shop/actions';
import { login } from 'features/user/actions';

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
    builder
      .addMatcher(isAnyOf(updateAreas.fulfilled, updateShop.fulfilled), (state, action) => {
        state.statusCode = STATUS_CODE.SUCCESS;
        state.statusMessage = action.payload.message;
        state.count = state.count + 1;
      })
      .addMatcher(
        isAnyOf(login.rejected, fetchArea.rejected, updateShop.rejected, updateAreas.rejected),
        (state, action) => {
          state.statusCode = STATUS_CODE.ERROR;
          state.statusMessage = action.error.message;
          state.count = state.count + 1;
        },
      )
      .addDefaultCase((state, action) => {
        if (action.type.endsWith('/rejected') && !action.type.includes('fetchShop')) {
          state.statusCode = STATUS_CODE.ERROR;
          state.statusMessage = navigator.onLine ? 'Etwas ist schief gelaufen.' : 'Netzwerkverbindung unterbrochen.';
          state.count = state.count + 1;
        }
      });
  },
});

export const { setStatusRequest, setStatusError } = slice.actions;
export default slice.reducer;
