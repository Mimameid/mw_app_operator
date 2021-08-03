import { createSelector, createSlice } from '@reduxjs/toolkit';
import { createSub, deleteSub, updateSub } from './actions';
import { fetchAll } from '../menus/actions';

// slice
const initialState = {
  byId: {},
};

const dishesSlice = createSlice({
  name: 'subs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAll.fulfilled, (state, action) => {
      state.byId = action.payload.subs;
    });
    builder.addCase(createSub.fulfilled, (state, action) => {
      state.byId[action.payload.sub.id] = action.payload.sub;
    });
    builder.addCase(updateSub.fulfilled, (state, action) => {
      state.byId[action.payload.sub.id] = action.payload.sub;
    });
    builder.addCase(deleteSub.fulfilled, (state, action) => {
      delete state.byId[action.payload];
    });
  },
});

// selectors
export const selectSubIdsToNames = createSelector(
  (state) => state.menus.subs.byId,
  (byId) => {
    const subsArray = Object.values(byId);
    const subIdsToNames = subsArray.map((elem, _) => {
      return [elem.id, elem.name];
    });

    return subIdsToNames;
  },
);

export default dishesSlice.reducer;
