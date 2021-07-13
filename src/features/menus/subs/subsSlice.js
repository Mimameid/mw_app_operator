import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  byId: {},
};

const subsSlice = createSlice({
  name: 'subs',
  initialState,
  reducers: {
    setChoices(state, action) {
      state.byId = action.payload.subs;
      state.idCounter = action.payload.idCounter;
    },
    createSub(state, action) {
      state.byId[action.payload.id] = {
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        created: Date.now(),
      };
    },
    deleteSub(state, action) {
      delete state.byId[action.payload];
    },
    editSub(state, action) {
      const newSub = action.payload;
      const sub = state.byId[newSub.id];

      sub.name = newSub.name;
      sub.price = newSub.price;
    },
  },
});

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

export const { setSubs, createSub, deleteSub, editSub } = subsSlice.actions;
export default subsSlice.reducer;
