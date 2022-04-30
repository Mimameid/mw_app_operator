import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchAllMenus } from '../menus/actions';
import { createSub, updateSub } from '../subs/actions';
import { setSubs, createChoice, deleteChoice, removeSub, updateChoice } from './actions';

const initialState = {
  byId: {},
};

const choicesSlice = createSlice({
  name: 'choices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMenus.fulfilled, (state, action) => {
        state.byId = action.payload.choices;
      })
      .addCase(createChoice.fulfilled, (state, action) => {
        state.byId[action.payload.choice.id] = action.payload.choice;
      })
      .addCase(updateChoice.fulfilled, (state, action) => {
        state.byId[action.payload.choice.id] = action.payload.choice;
      })
      .addCase(deleteChoice.fulfilled, (state, action) => {
        delete state.byId[action.payload];
      })
      .addCase(setSubs.fulfilled, (state, action) => {
        const choice = state.byId[action.payload.choiceId];
        choice.subs = action.payload.subs;
      })
      .addCase(removeSub.fulfilled, (state, action) => {
        const choice = state.byId[action.payload.choiceId];
        const index = choice.subs.indexOf(action.payload.subId);
        if (index > -1) {
          choice.subs.splice(index, 1);
        }
      })
      .addCase(createSub.fulfilled, (state, action) => {
        for (let choiceId of action.payload.choices) {
          state.byId[choiceId].subs.push(action.payload.sub.id);
        }
      })
      .addCase(updateSub.fulfilled, (state, action) => {
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

export const selectChoicesAsArray = createSelector(
  (state) => state.menus.choices.byId,
  (byId) => {
    const choicesArray = Object.values(byId);
    choicesArray.sort((a, b) => a.name.localeCompare(b.name));
    return choicesArray;
  },
);

export default choicesSlice.reducer;
