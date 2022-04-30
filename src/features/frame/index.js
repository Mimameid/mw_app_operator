import { createSelector, createReducer } from '@reduxjs/toolkit';
import { activateMenu } from 'features/products/menus/actions';

import { fetchShop } from 'features/shop/shop/actions';
import { setDeactivatedShopNotification, setDrawerOpen } from './actions';

const initialState = {
  drawerOpen: false,
  deactivatedShopNotificationOpen: false,
  hasActiveMenu: false,
};

const frame = createReducer(initialState, (builder) =>
  builder
    .addCase(setDrawerOpen, (state, action) => {
      state.drawerOpen = action.payload;
    })
    .addCase(setDeactivatedShopNotification, (state, action) => {
      state.deactivatedShopNotificationOpen = action.payload;
    })
    .addCase(fetchShop.fulfilled, (state, action) => {
      console.log(action.payload);
      for (const menu of Object.values(action.payload.menus)) {
        if (menu.isActive) {
          state.hasActiveMenu = true;
          break;
        }
      }
    })

    .addCase(activateMenu.fulfilled, (state, action) => {
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

export default frame;
