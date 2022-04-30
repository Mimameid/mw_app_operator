import { createSelector, createSlice } from '@reduxjs/toolkit';
import { createCategory, updateCategory, deleteCategory, setProducts, removeProduct } from './actions';
import { createProduct, updateProduct } from '../products/actions';
import { fetchAllMenus } from '../menus/actions';

const initialState = {
  byId: {},
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMenus.fulfilled, (state, action) => {
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
      .addCase(setProducts.fulfilled, (state, action) => {
        const category = state.byId[action.payload.categoryId];
        category.products = action.payload.products;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        const category = state.byId[action.payload.categoryId];
        const index = category.products.indexOf(action.payload.productId);
        if (index > -1) {
          category.products.splice(index, 1);
        }
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        for (let categoryId of action.payload.categories) {
          state.byId[categoryId].products.push(action.payload.product.id);
        }
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const categories = Object.values(state.byId);
        for (let category of categories) {
          const index = category.products.indexOf(action.payload.product.id);
          if (index > -1) {
            category.products.splice(index, 1);
          }
        }

        for (let categoryId of action.payload.categories) {
          state.byId[categoryId].products.push(action.payload.product.id);
        }
      });
  },
});

// selectors
export const makeSelectAffectedCategories = () =>
  createSelector(
    (state) => state.menus.categories.byId,
    (_, productId) => productId,
    (byId, productId) => {
      const categoriesArray = Object.values(byId);

      let affectedCategories = [];
      for (let category of categoriesArray) {
        if (category.products.includes(productId)) {
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

export const selectCategoriesAsArray = createSelector(
  (state) => state.menus.categories.byId,
  (byId) => {
    const categoriesArray = Object.values(byId);
    categoriesArray.sort((a, b) => a.name.localeCompare(b.name));
    return categoriesArray;
  },
);

export default categoriesSlice.reducer;
