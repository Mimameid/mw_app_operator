import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchShop } from 'features/shop/shop/actions';
import {
  fetchAllMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  setCategories,
  removeCategory,
  activateMenu,
} from './actions';
import { createCategory, updateCategory } from '../categories/actions';

// reducer
const initialState = {
  byId: {},
};

const slice = createSlice({
  name: 'menus',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMenus.fulfilled, (state, action) => {
        state.byId = action.payload.menus;
      })
      .addCase(fetchShop.fulfilled, (state, action) => {
        state.byId = action.payload.menus;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload;
      })
      .addCase(activateMenu.fulfilled, (state, action) => {
        for (const menu of Object.values(state.byId)) {
          if (menu.isActive) {
            menu.isActive = false;
          }
        }

        const menu = state.byId[action.payload.menuId];
        menu.isActive = true;
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload;
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        delete state.byId[action.payload];
      })
      .addCase(setCategories.fulfilled, (state, action) => {
        const menu = state.byId[action.payload.menuId];
        menu.categories = action.payload.categories;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        const menu = state.byId[action.payload.menuId];
        const index = menu.categories.indexOf(action.payload.categoryId);
        if (index > -1) {
          menu.categories.splice(index, 1);
        }
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        for (let menuId of action.payload.menus) {
          state.byId[menuId].categories.push(action.payload.category.id);
        }
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const menus = Object.values(state.byId);
        for (let menu of menus) {
          const index = menu.categories.indexOf(action.payload.category.id);
          if (index > -1) {
            menu.categories.splice(index, 1);
          }
        }
        for (let menuId of action.payload.menus) {
          state.byId[menuId].categories.push(action.payload.category.id);
        }
      });
  },
});

// selectors
export const makeSelectAffectedMenus = () =>
  createSelector(
    (state) => state.menus.menus.byId,
    (_, categoryId) => categoryId,
    (byId, categoryId) => {
      const menusArray = Object.values(byId);

      let affectedMenus = [];
      for (let menu of menusArray) {
        if (menu.categories.includes(categoryId)) {
          affectedMenus.push([menu.id, menu.name]);
        }
      }

      return affectedMenus;
    },
  );

export const selectMenuIdsToNames = createSelector(
  (state) => state.menus.menus.byId,
  (byId) => {
    const menuArray = Object.values(byId);
    const menuIdToNames = menuArray.map((elem, _) => {
      return [elem.id, elem.name];
    });

    return menuIdToNames;
  },
);

export const selectActiveMenu = createSelector(
  (state) => state.menus.menus.byId,
  (byId) => {
    const menusArray = Object.values(byId);
    return menusArray.find((menu) => menu.isActive === true);
  },
);

export const selectHasProducts = createSelector(
  (state) => state.menus.categories.byId,
  (_, menu) => menu,
  (categories, menu) => {
    for (const categoryId of menu.categories) {
      if (categories[categoryId].products.length) {
        return true;
      }
    }

    return false;
  },
);

export default slice.reducer;
