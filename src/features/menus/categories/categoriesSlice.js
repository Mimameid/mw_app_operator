import { createSelector, createSlice } from '@reduxjs/toolkit';
import { deleteDish } from '../dishes/dishesSlice';

const initialState = {
  idCounter: 0,
  byId: {},
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
      state.byId[action.payload.id] = {
        id: action.payload.id,
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
    addDish(state, action) {
      const newDish = action.payload.dishId;
      const currentCategoryDishes = state.byId[action.payload.categoryId].dishes;

      if (currentCategoryDishes.indexOf(newDish) < 0) {
        currentCategoryDishes.push(newDish);
      }
    },
    removeDish(state, action) {
      const currentCategory = state.byId[action.payload.categoryId];
      const index = currentCategory.dishes.indexOf(action.payload.dishId);

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
      const categoriesArray = Object.values(byId);

      let affectedCategories = [];
      for (let category of categoriesArray) {
        if (category.dishes.includes(dishId)) {
          affectedCategories.push([category.id, category.name]);
        }
      }

      return affectedCategories;
    },
  );

export const selectCategoryIdsToNames = createSelector(
  (state) => state.menus.categories.byId,
  (byId) => {
    const categoryArray = Object.values(byId);
    const categoryIdsToNames = categoryArray.map((elem, _) => {
      return [elem.id, elem.name];
    });

    return categoryIdsToNames;
  },
);

export const { setCategories, createCategory, deleteCategory, editCategory, selectCategory, addDish, removeDish } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
