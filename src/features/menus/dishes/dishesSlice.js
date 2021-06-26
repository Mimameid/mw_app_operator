import { createSlice } from '@reduxjs/toolkit';

// slice
const initialState = {
  dishesCounter: 0,
  dishes: {},
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    setDishes(state, action) {
      state.dishes = action.payload.dishes;
      state.dishesCounter = action.payload.dishesCounter;
    },
    createDish(state, action) {
      state.dishesCounter++;
      state.dishes[state.dishesCounter] = {
        id: state.dishesCounter,
        name: action.payload.name,
        desc: action.payload.description,
        type: action.payload.type,
        price: action.payload.price,
        choices: {},
        created: Date.now(),
      };
    },
    deleteDish(state, action) {
      delete state.dishes[action.payload];
    },
    editDish(state, action) {},
    addChoice(state, action) {
      state.activeDish.choices.push({ name: 'Neue Auswahl' });
    },
    removeChoice(state, action) {},
  },
});

export const { setDishes, createDish, deleteDish, editDish, addChoice, removeChoice } = dishesSlice.actions;
export default dishesSlice.reducer;
