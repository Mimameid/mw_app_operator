import { createSelector, createSlice } from '@reduxjs/toolkit';
import { createCoupon, fetchCoupons, updateCoupon, deleteCoupon } from './actions';

const initialState = {
  byId: {},
};

const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.byId = action.payload;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        delete state.byId[action.payload];
      });
  },
});

export const selectDiscountIdsToNames = createSelector(
  (state) => state.offers.discount.byId,
  (byId) => {
    const discountArray = Object.values(byId);
    const discountIdsToNames = discountArray.map((elem, _) => {
      return [elem.id, elem.name];
    });

    return discountIdsToNames;
  },
);

export default couponsSlice.reducer;
