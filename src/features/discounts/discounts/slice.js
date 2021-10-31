import { createSelector, createSlice } from '@reduxjs/toolkit';
import { createDiscount, fetchDiscounts, updateDiscount, deleteDiscount, setActivationDiscount } from './actions';

const initialState = {
  byId: {},
};

const discountsSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.byId = action.payload;
      })
      .addCase(createDiscount.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload;
      })
      .addCase(updateDiscount.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload;
      })
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        delete state.byId[action.payload];
      })
      .addCase(setActivationDiscount.fulfilled, (state, action) => {
        state.byId[action.payload.discountId].isActive = action.payload.isActive;
      });
  },
});

export const selectDiscountIdsToNames = createSelector(
  (state) => state.menus.discount.byId,
  (byId) => {
    const discountArray = Object.values(byId);
    const discountIdsToNames = discountArray.map((elem, _) => {
      return [elem.id, elem.name];
    });

    return discountIdsToNames;
  },
);

export default discountsSlice.reducer;
