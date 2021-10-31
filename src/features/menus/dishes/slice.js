import { createSelector, createSlice } from '@reduxjs/toolkit';
import { createDish, deleteDish, updateDish, addChoices, removeChoice, setAvailable } from './actions';
import { fetchAllMenus } from '../menus/actions';
import { createChoice, updateChoice } from '../choices/actions';

// slice
const initialState = {
  byId: {},
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMenus.fulfilled, (state, action) => {
        state.byId = action.payload.dishes;
      })
      .addCase(createDish.fulfilled, (state, action) => {
        state.byId[action.payload.dish.id] = action.payload.dish;
      })
      .addCase(updateDish.fulfilled, (state, action) => {
        state.byId[action.payload.dish.id] = action.payload.dish;
      })
      .addCase(deleteDish.fulfilled, (state, action) => {
        delete state.byId[action.payload];
      })
      .addCase(addChoices.fulfilled, (state, action) => {
        const dish = state.byId[action.payload.dishId];
        for (const choiceId of action.payload.choices) {
          if (dish.choices.indexOf(choiceId) < 0) {
            dish.choices.push(choiceId);
          }
        }
      })
      .addCase(removeChoice.fulfilled, (state, action) => {
        const dish = state.byId[action.payload.dishId];
        const index = dish.choices.indexOf(action.payload.choiceId);
        if (index > -1) {
          dish.choices.splice(index, 1);
        }
      })
      .addCase(setAvailable.fulfilled, (state, action) => {
        const dish = state.byId[action.payload.dishId];
        dish.isAvailable = action.payload.isAvailable;
      })
      .addCase(createChoice.fulfilled, (state, action) => {
        for (let dishId of action.payload.dishes) {
          state.byId[dishId].choices.push(action.payload.choice.id);
        }
      })
      .addCase(updateChoice.fulfilled, (state, action) => {
        const dishes = Object.values(state.byId);
        for (let dish of dishes) {
          const index = dish.choices.indexOf(action.payload.choice.id);
          if (index > -1) {
            dish.choices.splice(index, 1);
          }
        }

        for (let dishId of action.payload.dishes) {
          state.byId[dishId].choices.push(action.payload.choice.id);
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

export default dishesSlice.reducer;
