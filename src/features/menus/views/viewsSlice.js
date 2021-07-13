import { createSlice } from '@reduxjs/toolkit';
import { deleteCategory } from '../categories/categoriesSlice';
import { deleteChoice } from '../choices/choicesSlice';
import { deleteDish } from '../dishes/dishesSlice';
import { deleteMenu } from '../menus/menusSlice';
import { deleteSub } from '../subs/subsSlice';

const initialState = {
  group: 0, // menus = 0, categories = 1, dishes = 2, choices = 3, options = 4
  itemId: null,
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
  },
  extraReducers: (builder) => {
    builder.addCase(deleteMenu, (state, action) => {
      if (state.group === 0 && state.itemId === action.payload) {
        state.itemId = null;
      }
    });
    builder.addCase(deleteCategory, (state, action) => {
      if (state.group === 1 && state.itemId === action.payload) {
        state.itemId = null;
      }
    });
    builder.addCase(deleteDish, (state, action) => {
      if (state.group === 2 && state.itemId === action.payload) {
        state.itemId = null;
      }
    });
    builder.addCase(deleteChoice, (state, action) => {
      if (state.group === 3 && state.itemId === action.payload) {
        state.itemId = null;
      }
    });
    builder.addCase(deleteSub, (state, action) => {
      if (state.group === 4 && state.itemId === action.payload) {
        state.itemId = null;
      }
    });
  },
});

export const { selectGroup, selectItem } = viewsSlice.actions;
export default viewsSlice.reducer;
