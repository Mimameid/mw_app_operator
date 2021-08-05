import { createSlice, current } from '@reduxjs/toolkit';
import { fetchRestaurant, queryPlace } from '../location/actions';

const initialState = {
  name: '',
  resId: '',
  version: '',
  url: '',
  urlLogo: '',
  types: [],
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
  locationState: {
    predictions: [],
    position: null,
    geoCode: '',
    sessionToken: '',
    lastSessionUpdate: 0,
    placeId: 0,
  },
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    saveOpeningHours(state, action) {
      console.log(action.payload);
      state.openingHours = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurant.fulfilled, (state, action) => {
      console.log(current(state));
      return { ...state, ...action.payload };
    });
    builder.addCase(queryPlace.fulfilled, (state, action) => {
      state.location = action.payload.address;
    });
  },
});

export const { saveOpeningHours } = restaurantSlice.actions;
export default restaurantSlice.reducer;
