import { createSlice } from '@reduxjs/toolkit';
import { deleteCoupon } from '../coupons/actions';
import { deleteDiscount } from '../discounts/actions';

const initialState = {
  group: 0, // discounts = 0, coupons = 1,
  itemId: null,
};

const viewsSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    selectDiscountGroup(state, action) {
      state.group = action.payload;
      state.itemId = null;
    },
    selectDiscountItem(state, action) {
      state.itemId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        if (state.group === 0 && state.itemId === action.payload) {
          state.itemId = null;
        }
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        if (state.group === 1 && state.itemId === action.payload) {
          state.itemId = null;
        }
      });
  },
});

export const { selectDiscountGroup, selectDiscountItem } = viewsSlice.actions;
export default viewsSlice.reducer;
