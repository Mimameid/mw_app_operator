import { createSlice } from '@reduxjs/toolkit';
import { fetchRestaurant, queryPlace } from '../location/actions';

const initialState = {
  name: '',
  resId: '',
  version: '',
  url: '',
  urlLogo: '',
  types: [],
  opening_hours: {},
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurant.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(queryPlace.fulfilled, (state, action) => {
      state.location = action.payload.address;
    });
  },
});

export default restaurantSlice.reducer;
