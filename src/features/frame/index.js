import { createSelector, createReducer } from '@reduxjs/toolkit';
import { activateOffer } from 'features/offers/offers/actions';

import { fetchShop } from 'features/shop/shop/actions';
import { setDeactivatedShopNotification, setDrawerOpen } from './actions';

const initialState = {
  drawerOpen: false,
  deactivatedShopNotificationOpen: false,
  hasActiveOffer: false,
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
      for (const offer of Object.values(action.payload.offers)) {
        if (offer.isActive) {
          state.hasActiveOffer = true;
          break;
        }
      }
    })

    .addCase(activateOffer.fulfilled, (state, action) => {
      state.hasActiveOffer = action.payload.isActive;
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
