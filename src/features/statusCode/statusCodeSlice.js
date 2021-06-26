import { createSlice, createAction, isAnyOf } from '@reduxjs/toolkit';
import STATUS_CODE from 'constants';

const areasError = createAction('DELIVERY_AREAS_ERROR');
const restaurantsError = createAction('RESTAURANT_DATA_ERROR');

const initialState = { statusCode: 0, statusMessage: '', count: 0 };

const drawerSlice = createSlice({
  name: 'drawer',
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
    builder.addMatcher(
      isAnyOf(areasError, restaurantsError),
      // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
      (state, action) => {
        state.statusCode = STATUS_CODE.ERROR;
        state.statusMessage = action.payload;
        state.count = state.count + 1;
      },
    );
  },
});

export const { setWidth, disableWidthChanged } = drawerSlice.actions;
export default drawerSlice.reducer;
