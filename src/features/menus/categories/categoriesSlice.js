import { createSelector, createSlice } from '@reduxjs/toolkit';

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
        dishes: {},
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
      state.byId[state.activeCategoryId].dishes[action.payload.id] = action.payload;
    },
    removeDish(state, action) {
      delete state.byId[action.payload.categoryId].dishes[action.payload.dishId];
    },
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
        if (Object.keys(category.dishes).includes(dishId.toString())) {
          affectedCategories.push(category.name);
        }
      }

      return affectedCategories;
    },
  );

export const { setCategories, createCategory, deleteCategory, editCategory, selectCategory, addDish, removeDish } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
