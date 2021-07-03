import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  idCounter: 0,
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
      state.idCounter++;
      state.byId[state.idCounter] = {
        id: state.idCounter,
        name: action.payload.name,
        price: action.payload.price,
        isSelected: action.payload.isSelected,
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
      sub.isSelected = newSub.isSelected;
    },
  },
});

export const { setSubs, createSub, deleteSub, editSub } = subsSlice.actions;
export default subsSlice.reducer;
