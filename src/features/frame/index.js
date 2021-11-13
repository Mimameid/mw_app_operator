import { createSelector, createReducer } from '@reduxjs/toolkit';
import { setActive } from 'features/menus/menus/actions';
import { fetchShop, updateShop } from 'features/shop/shop/actions';
import { setDrawerOpen } from './actions';

const initialState = { drawerOpen: false, hasActiveMenu: false, hasOpeningHours: false };

const frame = createReducer(initialState, (builder) =>
  builder
    .addCase(setDrawerOpen, (state, action) => {
      state.drawerOpen = action.payload;
    })
    .addCase(fetchShop.fulfilled, (state, action) => {
      for (const menu of Object.values(action.payload.menus)) {
        if (menu.isActive) {
          state.hasActiveMenu = true;
          break;
        }
      }

      for (const ranges of Object.values(action.payload.shop.openingHours)) {
        if (ranges.length) {
          state.hasOpeningHours = true;
          break;
        }
      }
    })
    .addCase(updateShop.fulfilled, (state, action) => {
      for (const ranges of Object.values(action.payload.data.openingHours)) {
        if (ranges.length) {
          state.hasOpeningHours = true;
          return;
        }
      }
      state.hasOpeningHours = false;
    })
    .addCase(setActive.fulfilled, (state, action) => {
      state.hasActiveMenu = action.payload.isActive;
    }),
);

export const selectUiMode = createSelector(
  (state) => state.mode.draw,
  (state) => state.mode.changed,
  (state) => state.frame.drawerOpen,
  (draw, changed, open) => {
    return { draw, changed, open };
  },
);

export const selectCanActivate = createSelector(
  (state) => state.frame.hasActiveMenu,
  (state) => state.frame.hasOpeningHours,
  (hasActiveMenu, hasOpeningHours) => ({ hasActiveMenu, hasOpeningHours }),
);

export default frame;
