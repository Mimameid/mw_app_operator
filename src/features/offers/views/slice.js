import { createSlice } from '@reduxjs/toolkit';
import { deleteCategory } from '../categories/actions';
import { deleteChoice } from '../choices/actions';
import { deleteDish } from '../dishes/actions';
import { deleteOffer } from '../offers/actions';
import { deleteSub } from '../subs/actions';

const initialState = {
  group: 0, // offers = 0, categories = 1, dishes = 2, choices = 3, options = 4
  itemId: null,
  action: null,
};

const viewsSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    selectGroup(state, action) {
      state.group = action.payload;
      state.itemId = null;
    },
    selectItem(state, action) {
      state.itemId = action.payload;
    },
    issueAction(state, action) {
      state.action = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteOffer.fulfilled, (state, action) => {
        if (state.group === 0 && state.itemId === action.payload) {
          state.itemId = null;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        if (state.group === 1 && state.itemId === action.payload) {
          state.itemId = null;
        }
      })
      .addCase(deleteDish.fulfilled, (state, action) => {
        if (state.group === 2 && state.itemId === action.payload) {
          state.itemId = null;
        }
      })
      .addCase(deleteChoice.fulfilled, (state, action) => {
        if (state.group === 3 && state.itemId === action.payload) {
          state.itemId = null;
        }
      })
      .addCase(deleteSub.fulfilled, (state, action) => {
        if (state.group === 4 && state.itemId === action.payload) {
          state.itemId = null;
        }
      });
  },
});

export const { selectGroup, selectItem } = viewsSlice.actions;
export default viewsSlice.reducer;
