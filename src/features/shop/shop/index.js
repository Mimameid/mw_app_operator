import { createReducer } from '@reduxjs/toolkit';
import { createShop, fetchShop, saveOpeningHours, updateShop } from './actions';
import { queryPlace } from '../location/actions';

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
  location: { address: '', coords: {} },
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
    })
    .addCase(queryPlace.fulfilled, (state, action) => {
      state.location.address = action.payload.address;
      state.location.coords = action.payload.coords;
    });
});

export default shopReducer;
