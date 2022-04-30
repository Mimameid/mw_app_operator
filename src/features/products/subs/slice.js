import { createSelector, createSlice } from '@reduxjs/toolkit';
import { createSub, deleteSub, updateSub } from './actions';
import { fetchAllMenus } from '../menus/actions';

// slice
const initialState = {
  byId: {},
};

const productsSlice = createSlice({
  name: 'subs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMenus.fulfilled, (state, action) => {
        state.byId = action.payload.subs;
      })
      .addCase(createSub.fulfilled, (state, action) => {
        state.byId[action.payload.sub.id] = action.payload.sub;
      })
      .addCase(updateSub.fulfilled, (state, action) => {
        state.byId[action.payload.sub.id] = action.payload.sub;
      })
      .addCase(deleteSub.fulfilled, (state, action) => {
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

export const selectSubsAsArray = createSelector(
  (state) => state.menus.subs.byId,
  (byId) => {
    const subsArray = Object.values(byId);
    subsArray.sort((a, b) => a.name.localeCompare(b.name));
    return subsArray;
  },
);

export default productsSlice.reducer;
