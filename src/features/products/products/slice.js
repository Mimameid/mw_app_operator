import { createSelector, createSlice } from '@reduxjs/toolkit';
import { createProduct, deleteProduct, updateProduct, setChoices, removeChoice, setAvailable } from './actions';
import { fetchAllMenus } from '../menus/actions';
import { createChoice, updateChoice } from '../choices/actions';

// slice
const initialState = {
  byId: {},
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMenus.fulfilled, (state, action) => {
        state.byId = action.payload.products;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.byId[action.payload.product.id] = action.payload.product;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.byId[action.payload.product.id] = action.payload.product;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        delete state.byId[action.payload];
      })
      .addCase(setChoices.fulfilled, (state, action) => {
        const product = state.byId[action.payload.productId];
        product.choices = action.payload.choices;
      })
      .addCase(removeChoice.fulfilled, (state, action) => {
        const product = state.byId[action.payload.productId];
        const index = product.choices.indexOf(action.payload.choiceId);
        if (index > -1) {
          product.choices.splice(index, 1);
        }
      })
      .addCase(setAvailable.fulfilled, (state, action) => {
        const product = state.byId[action.payload.productId];
        product.isAvailable = action.payload.isAvailable;
      })
      .addCase(createChoice.fulfilled, (state, action) => {
        for (let productId of action.payload.products) {
          state.byId[productId].choices.push(action.payload.choice.id);
        }
      })
      .addCase(updateChoice.fulfilled, (state, action) => {
        const products = Object.values(state.byId);
        for (let product of products) {
          const index = product.choices.indexOf(action.payload.choice.id);
          if (index > -1) {
            product.choices.splice(index, 1);
          }
        }

        for (let productId of action.payload.products) {
          state.byId[productId].choices.push(action.payload.choice.id);
        }
      });
  },
});

// selectors
export const makeSelectAffectedProducts = () =>
  createSelector(
    (state) => state.menus.products.byId,
    (_, choiceId) => choiceId,
    (byId, choiceId) => {
      let affectedProducts = [];
      const productsArray = Object.values(byId);
      for (let product of productsArray) {
        if (product.choices.includes(choiceId)) {
          affectedProducts.push([product.id, product.name]);
        }
      }

      return affectedProducts;
    },
  );

export const selectProductIdsToNames = createSelector(
  (state) => state.menus.products.byId,
  (byId) => {
    const productsArray = Object.values(byId);
    const productIdsToNames = productsArray.map((elem, _) => {
      return [elem.id, elem.name];
    });

    return productIdsToNames;
  },
);

export const selectProductsAsArray = createSelector(
  (state) => state.menus.products.byId,
  (byId) => {
    let productsArray = Object.values(byId);
    productsArray.sort((a, b) => a.name.localeCompare(b.name));
    return productsArray;
  },
);

export default productsSlice.reducer;
