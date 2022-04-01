import { createReducer } from '@reduxjs/toolkit';
import {
  createShop,
  fetchShop,
  updateShopActive,
  updateShopDelivery,
  updateShopOpen,
  updateShopPickup,
  updateShop,
} from './actions';

const initialState = {
  name: '',
  desc: '',
  descLong: '',
  phoneNumber: '',
  url: '',
  cuisineTypes: [],
  cuisineLabels: [],
  isActive: false,
  isOpen: false,
  isDelivery: false,
  isPickup: false,
  isKosher: false,
  isLocal: true,
  openingHours: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
  location: { postCode: '', city: '', street: '', number: '' },
};

const shopReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateShop.fulfilled, (state, action) => {
      return { ...state, ...action.payload.data };
    })
    .addCase(fetchShop.fulfilled, (state, action) => {
      return { ...state, ...action.payload.shop };
    })
    .addCase(createShop.fulfilled, (state, action) => {
      return { ...state, ...action.payload.data };
    })
    .addCase(updateShopActive.fulfilled, (state, action) => {
      state.isActive = !state.isActive;
    })
    .addCase(updateShopOpen.fulfilled, (state, action) => {
      state.isOpen = !state.isOpen;
    })
    .addCase(updateShopDelivery.fulfilled, (state, action) => {
      state.isDelivery = !state.isDelivery;
    })
    .addCase(updateShopPickup.fulfilled, (state, action) => {
      state.isPickup = !state.isPickup;
    });
});

export default shopReducer;
