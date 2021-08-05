import { createSlice } from '@reduxjs/toolkit';
import { queryPlace, queryPredictions } from './actions';

const initialState = {
  predictions: [],
  position: null,
  geoCode: '',
  sessionToken: '',
  lastSessionUpdate: 0,
  placeId: 0,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(queryPredictions.fulfilled, (state, action) => {
      state.predictions = [];
      if (action.payload) {
        const { predictions, timestamp, sessionToken } = action.payload;
        state.sessionToken = sessionToken;
        state.lastSessionUpdate = timestamp;
        state.predictions = predictions;
      }
    });
    builder.addCase(queryPlace.fulfilled, (state, action) => {
      const { address, placeId, timestamp, sessionToken } = action.payload;

      state.placeId = placeId;
      state.sessionToken = sessionToken;
      state.lastSessionUpdate = timestamp;
      state.geoCode = address;
    });
  },
});

export default locationSlice.reducer;
