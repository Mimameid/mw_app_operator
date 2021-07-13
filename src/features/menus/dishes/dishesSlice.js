import { createSelector, createSlice } from '@reduxjs/toolkit';
import { deleteChoice } from '../choices/choicesSlice';

// slice
const initialState = {
  byId: {},
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    setDishes(state, action) {
      state.byId = action.payload.dishes;
    },
    createDish(state, action) {
      state.byId[action.payload.id] = {
        id: action.payload.id,
        name: action.payload.name,
        desc: action.payload.desc,
        type: action.payload.type,
        price: action.payload.price,
        tags: action.payload.tags,
        available: action.payload.available,
        choices: [],
        created: Date.now(),
      };
    },
    deleteDish(state, action) {
      delete state.byId[action.payload];
    },
    editDish(state, action) {
      console.log(action.payload);
      const newDish = action.payload;
      const dish = state.byId[newDish.id];

      dish.name = newDish.name;
      dish.desc = newDish.desc;
      dish.type = newDish.type;
      dish.price = newDish.price;
      dish.tags = newDish.tags;
      dish.available = newDish.available;
    },
    addChoice(state, action) {
      const newChoice = action.payload.choiceId;
      const currentDishChoices = state.byId[action.payload.dishId].choices;

      if (currentDishChoices.indexOf(newChoice) < 0) {
        currentDishChoices.push(newChoice);
      }
    },
    removeChoice(state, action) {
      const currentDish = state.byId[action.payload.dishId];
      const index = currentDish.choices.indexOf(action.payload.choiceId);

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
          affectedDishes.push([dish.id, dish.name]);
        }
      }

      return affectedDishes;
    },
  );

export const selectDishIdsToNames = createSelector(
  (state) => state.menus.dishes.byId,
  (byId) => {
    const dishesArray = Object.values(byId);
    const dishIdsToNames = dishesArray.map((elem, _) => {
      return [elem.id, elem.name];
    });

    return dishIdsToNames;
  },
);

export const { setDishes, createDish, deleteDish, editDish, selectDish, addChoice, removeChoice } = dishesSlice.actions;
export default dishesSlice.reducer;
