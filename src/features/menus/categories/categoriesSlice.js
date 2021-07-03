import { createSelector, createSlice } from '@reduxjs/toolkit';
import { deleteDish } from '../dishes/dishesSlice';

const initialState = {
  idCounter: 0,
  byId: {},
  activeCategoryId: 0,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.byId = action.payload.categories;
      state.idCounter = action.payload.idCounter;
    },
    createCategory(state, action) {
      state.idCounter++;
      state.byId[state.idCounter] = {
        id: state.idCounter,
        name: action.payload.name,
        desc: action.payload.description,
        dishes: [],
        created: Date.now(),
      };
    },
    deleteCategory(state, action) {
      delete state.byId[action.payload];
    },
    editCategory(state, action) {
      state.byId[action.payload.id].name = action.payload.name;
      state.byId[action.payload.id].desc = action.payload.description;
    },
    selectCategory(state, action) {
      state.activeCategoryId = action.payload;
    },
    addDish(state, action) {
      const newDish = action.payload;
      const currentCategoryDishes = state.byId[state.activeCategoryId].dishes;

      if (currentCategoryDishes.indexOf(newDish) < 0) {
        currentCategoryDishes.push(newDish);
      }
    },
    removeDish(state, action) {
      const currentCategory = state.byId[state.activeCategoryId];
      const index = currentCategory.dishes.indexOf(action.payload);

      currentCategory.dishes.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteDish, (state, action) => {
      const categories = Object.values(state.byId);
      for (let category of categories) {
        const index = category.dishes.indexOf(action.payload);
        if (index > -1) {
          category.dishes.splice(index, 1);
        }
      }
    });
  },
});

// selectors
export const makeSelectAffectedCategories = () =>
  createSelector(
    (state) => state.menus.categories.byId,
    (_, dishId) => dishId,
    (byId, dishId) => {
      let affectedCategories = [];
      const categoriesArray = Object.values(byId);
      for (let category of categoriesArray) {
        if (category.dishes.includes(dishId)) {
          affectedCategories.push(category.name);
        }
      }

      return affectedCategories;
    },
  );

export const { setCategories, createCategory, deleteCategory, editCategory, selectCategory, addDish, removeDish } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
