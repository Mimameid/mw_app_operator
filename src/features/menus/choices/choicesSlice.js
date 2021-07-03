import { createSelector, createSlice } from '@reduxjs/toolkit';
import { deleteSub } from '../subs/subsSlice';

const initialState = {
  idCounter: 0,
  byId: {},
  activeChoiceId: 0,
};

const choicesSlice = createSlice({
  name: 'choices',
  initialState,
  reducers: {
    setChoices(state, action) {
      state.byId = action.payload.choices;
      state.idCounter = action.payload.idCounter;
    },
    createChoice(state, action) {
      state.idCounter++;
      state.byId[state.idCounter] = {
        id: state.idCounter,
        name: action.payload.name,
        desc: action.payload.description,
        maxAllowed: action.payload.maxAllowed,
        minRequired: action.payload.minRequired,
        subs: [],
        created: Date.now(),
      };
    },
    deleteChoice(state, action) {
      delete state.byId[action.payload];
    },
    editChoice(state, action) {
      const newChoice = action.payload;
      const choice = state.byId[newChoice.id];

      choice.name = newChoice.name;
      choice.desc = newChoice.description;
      choice.maxAllowed = newChoice.maxAllowed;
      choice.minRequired = newChoice.minRequired;
    },
    selectChoice(state, action) {
      state.activeChoiceId = action.payload;
    },
    addSub(state, action) {
      const newSub = action.payload;
      const currentChoiceSubs = state.byId[state.activeChoiceId].subs;

      if (currentChoiceSubs.indexOf(newSub) < 0) {
        currentChoiceSubs.push(newSub);
      }
    },
    removeSub(state, action) {
      const currentChoice = state.byId[state.activeChoiceId];
      const index = currentChoice.subs.indexOf(action.payload);

      currentChoice.subs.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteSub, (state, action) => {
      const choices = Object.values(state.byId);
      for (let choice of choices) {
        const index = choice.subs.indexOf(action.payload);
        if (index > -1) {
          choice.subs.splice(index, 1);
        }
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
          affectedChoices.push(choice.name);
        }
      }

      return affectedChoices;
    },
  );

export const { setChoices, createChoice, deleteChoice, editChoice, selectChoice, addSub, removeSub } =
  choicesSlice.actions;
export default choicesSlice.reducer;
