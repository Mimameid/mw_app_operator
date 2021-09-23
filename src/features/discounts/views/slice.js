import { createSlice } from '@reduxjs/toolkit';
// import { deleteCategory } from '../categories/actions';
// import { deleteChoice } from '../choices/actions';
// import { deleteDish } from '../dishes/actions';
// import { deleteMenu } from '../menus/actions';
// import { deleteSub } from '../subs/actions';

const initialState = {
  group: 0, // menus = 0, categories = 1, dishes = 2, choices = 3, options = 4
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
    // builder
    //   .addCase(deleteMenu.fulfilled, (state, action) => {
    //     if (state.group === 0 && state.itemId === action.payload) {
    //       state.itemId = null;
    //     }
    //   })
    //   .addCase(deleteCategory.fulfilled, (state, action) => {
    //     if (state.group === 1 && state.itemId === action.payload) {
    //       state.itemId = null;
    //     }
    //   })
    //   .addCase(deleteDish.fulfilled, (state, action) => {
    //     if (state.group === 2 && state.itemId === action.payload) {
    //       state.itemId = null;
    //     }
    //   })
    //   .addCase(deleteChoice.fulfilled, (state, action) => {
    //     if (state.group === 3 && state.itemId === action.payload) {
    //       state.itemId = null;
    //     }
    //   })
    //   .addCase(deleteSub.fulfilled, (state, action) => {
    //     if (state.group === 4 && state.itemId === action.payload) {
    //       state.itemId = null;
    //     }
    //   });
  },
});

export const { selectDiscountGroup, selectDiscountItem } = viewsSlice.actions;
export default viewsSlice.reducer;
