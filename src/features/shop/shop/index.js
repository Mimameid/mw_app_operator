import { createReducer } from '@reduxjs/toolkit';
import { createShop, fetchShop, saveOpeningHours, updateShop } from './actions';

const initialState = {
  name: '',
  desc: '',
  descLong: '',
  phoneNumber: '',
  url: '',
  cuisineTypes: [],
  serviceTypes: [],
  cuisineLabels: [],
  isActive: false,
  isKosher: false,
  openingHours: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
  location: { postCode: '', city: '', street: '', streetNumber: '' },
  // logo: '',
};

const shopReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(saveOpeningHours, (state, action) => {
      // This throws an error if not deep copied....I think it is bc RHF and deep nesting
      state.openingHours = JSON.parse(JSON.stringify(action.payload));
    })
    .addCase(updateShop.fulfilled, (state, action) => {
      return { ...state, ...action.payload.data };
    })
    .addCase(fetchShop.fulfilled, (state, action) => {
      return { ...state, ...action.payload.shop };
    })
    .addCase(createShop.fulfilled, (state, action) => {
      return { ...state, ...action.payload.data };
    });
});

export default shopReducer;
