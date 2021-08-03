import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchAll } from '../menus/actions';
import { createSub, updateSub } from '../subs/actions';
import { addSubs, createChoice, deleteChoice, removeSub, updateChoice } from './actions';

const initialState = {
  byId: {},
};

const choicesSlice = createSlice({
  name: 'choices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAll.fulfilled, (state, action) => {
      state.byId = action.payload.choices;
    });
    builder.addCase(createChoice.fulfilled, (state, action) => {
      state.byId[action.payload.choice.id] = action.payload.choice;
    });
    builder.addCase(updateChoice.fulfilled, (state, action) => {
      state.byId[action.payload.choice.id] = action.payload.choice;
    });
    builder.addCase(deleteChoice.fulfilled, (state, action) => {
      delete state.byId[action.payload];
    });
    builder.addCase(addSubs.fulfilled, (state, action) => {
      const choice = state.byId[action.payload.choiceId];
      for (const subId of action.payload.subs) {
        if (choice.subs.indexOf(subId) < 0) {
          choice.subs.push(subId);
        }
      }
    });
    builder.addCase(removeSub.fulfilled, (state, action) => {
      const choice = state.byId[action.payload.choiceId];
      const index = choice.subs.indexOf(action.payload.subId);
      if (index > -1) {
        choice.subs.splice(index, 1);
      }
    });
    builder.addCase(createSub.fulfilled, (state, action) => {
      for (let choiceId of action.payload.choices) {
        state.byId[choiceId].subs.push(action.payload.sub.id);
      }
    });
    builder.addCase(updateSub.fulfilled, (state, action) => {
      const choices = Object.values(state.byId);
      for (let choice of choices) {
        const index = choice.subs.indexOf(action.payload.sub.id);
        if (index > -1) {
          choice.subs.splice(index, 1);
        }
      }

      for (let choiceId of action.payload.choices) {
        state.byId[choiceId].subs.push(action.payload.sub.id);
      }
    });
  },
});

// selectors
export const makeSelectAffectedChoices = () =>
  createSelector(
    (state) => state.menus.choices.byId,
    (_, subId) => subId,
    (byId, subId) => {
      let affectedChoices = [];
      const choicesArray = Object.values(byId);
      for (let choice of choicesArray) {
        if (choice.subs.includes(subId)) {
          affectedChoices.push([choice.id, choice.name]);
        }
      }

      return affectedChoices;
    },
  );

export const selectChoiceIdsToNames = createSelector(
  (state) => state.menus.choices.byId,
  (byId) => {
    const choicesArray = Object.values(byId);
    const choiceIdsToNames = choicesArray.map((elem, _) => {
      return [elem.id, elem.name];
    });

    return choiceIdsToNames;
  },
);

export default choicesSlice.reducer;
