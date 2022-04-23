import { createSelector, createSlice } from '@reduxjs/toolkit';
import { createCategory, updateCategory, deleteCategory, setDishes, removeDish } from './actions';
import { createDish, updateDish } from '../dishes/actions';
import { fetchAllOffers } from '../offers/actions';

const initialState = {
  byId: {},
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.byId = action.payload.categories;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.byId[action.payload.category.id] = action.payload.category;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.byId[action.payload.category.id] = action.payload.category;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        delete state.byId[action.payload];
      })
      .addCase(setDishes.fulfilled, (state, action) => {
        const category = state.byId[action.payload.categoryId];
        category.dishes = action.payload.dishes;
      })
      .addCase(removeDish.fulfilled, (state, action) => {
        const category = state.byId[action.payload.categoryId];
        const index = category.dishes.indexOf(action.payload.dishId);
        if (index > -1) {
          category.dishes.splice(index, 1);
        }
      })
      .addCase(createDish.fulfilled, (state, action) => {
        for (let categoryId of action.payload.categories) {
          state.byId[categoryId].dishes.push(action.payload.dish.id);
        }
      })
      .addCase(updateDish.fulfilled, (state, action) => {
        const categories = Object.values(state.byId);
        for (let category of categories) {
          const index = category.dishes.indexOf(action.payload.dish.id);
          if (index > -1) {
            category.dishes.splice(index, 1);
          }
        }

        for (let categoryId of action.payload.categories) {
          state.byId[categoryId].dishes.push(action.payload.dish.id);
        }
      });
  },
});

// selectors
export const makeSelectAffectedCategories = () =>
  createSelector(
    (state) => state.offers.categories.byId,
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
  (state) => state.offers.categories.byId,
  (byId) => {
    const categoryArray = Object.values(byId);
    const categoryIdsToNames = categoryArray.map((elem, _) => {
      return [elem.id, elem.name];
    });

    return categoryIdsToNames;
  },
);

export const selectCategoriesAsArray = createSelector(
  (state) => state.offers.categories.byId,
  (byId) => {
    const categoriesArray = Object.values(byId);
    categoriesArray.sort((a, b) => a.name.localeCompare(b.name));
    return categoriesArray;
  },
);

export default categoriesSlice.reducer;
