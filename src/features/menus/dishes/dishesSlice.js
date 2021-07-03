import { createSelector, createSlice } from '@reduxjs/toolkit';
import { deleteChoice } from '../choices/choicesSlice';

// slice
const initialState = {
  idCounter: 0,
  byId: {},
  activeDishId: 0,
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    setDishes(state, action) {
      state.byId = action.payload.dishes;
      state.idCounter = action.payload.idCounter;
    },
    createDish(state, action) {
      state.idCounter++;
      state.byId[state.idCounter] = {
        id: state.idCounter,
        name: action.payload.name,
        desc: action.payload.description,
        type: action.payload.type,
        price: action.payload.price,
        choices: [],
        created: Date.now(),
      };
    },
    deleteDish(state, action) {
      delete state.byId[action.payload];
    },
    editDish(state, action) {
      const newDish = action.payload;
      const dish = state.byId[newDish.id];

      dish.name = newDish.name;
      dish.desc = newDish.description;
      dish.type = newDish.type;
      dish.price = newDish.price;
    },
    selectDish(state, action) {
      state.activeDishId = action.payload;
    },
    addChoice(state, action) {
      const newChoice = action.payload;
      const currentDishChoices = state.byId[state.activeDishId].choices;

      if (currentDishChoices.indexOf(newChoice) < 0) {
        currentDishChoices.push(newChoice);
      }
    },
    removeChoice(state, action) {
      const currentDish = state.byId[state.activeDishId];
      const index = currentDish.choices.indexOf(action.payload);

      currentDish.choices.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteChoice, (state, action) => {
      const dishes = Object.values(state.byId);
      for (let dish of dishes) {
        const index = dish.choices.indexOf(action.payload);
        if (index > -1) {
          dish.choices.splice(index, 1);
        }
      }
    });
  },
});

// selectors
export const makeSelectAffectedDishes = () =>
  createSelector(
    (state) => state.menus.dishes.byId,
    (_, choiceId) => choiceId,
    (byId, choiceId) => {
      let affectedDishes = [];
      const dishesArray = Object.values(byId);
      for (let dish of dishesArray) {
        if (dish.choices.includes(choiceId)) {
          affectedDishes.push(dish.name);
        }
      }

      return affectedDishes;
    },
  );

export const { setDishes, createDish, deleteDish, editDish, selectDish, addChoice, removeChoice } = dishesSlice.actions;
export default dishesSlice.reducer;
