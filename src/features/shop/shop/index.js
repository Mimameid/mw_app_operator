import { createReducer } from '@reduxjs/toolkit';
import { fetchShop, saveOpeningHours, updateShop } from './actions';
import { queryPlace } from '../location/actions';

const initialState = {
  name: '',
  resId: '',
  isActive: false,
  isKosher: false,
  url: '',
  serviceTypes: [],
  cuisineTypes: [],
  cuisineLabels: [],
  phoneNumber: '',
  openingHours: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
  location: {},
  details: {},
  // timestamp: '',
  // created: ''
  // logo: '',
};

const shopReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(saveOpeningHours, (state, action) => {
      state.openingHours = action.payload;
    })
    .addCase(updateShop.fulfilled, (state, action) => {
      return { ...state, ...action.payload.data };
    })
    .addCase(fetchShop.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    })
    .addCase(queryPlace.fulfilled, (state, action) => {
      state.location.address = action.payload.address;
      state.location.coords = action.payload.coords;
    });
});

export default shopReducer;
