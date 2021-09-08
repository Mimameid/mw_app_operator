import { createAsyncThunk } from '@reduxjs/toolkit';

export const queryPredictions = createAsyncThunk('location/queryAddress', async (query, thunkAPI) => {
  if (!query) {
    return Promise.resolve();
  }

  // Update session token only if 3 minutes passed
  const timestamp = Date.now();
  let { sessionToken, lastSessionUpdate } = thunkAPI.getState().shop.location;
  if (lastSessionUpdate === 0 || timestamp - lastSessionUpdate > 120000) {
    sessionToken = new window.google.maps.places.AutocompleteSessionToken();
  }

  const autocompleteService = new window.google.maps.places.AutocompleteService();
  const results = await autocompleteService.getPlacePredictions(
    {
      input: query,
      componentRestrictions: { country: 'de' },
      types: ['address'],
      sessionToken: sessionToken,
    },
    (results, status) => {
      return results;
      // TODO: Handle error (best way would be not to use the google api !library!, but rather try to use the google REST endpoint via fetch or XMLHTTPREQUEST...)
    },
  );
  return Promise.resolve({ predictions: results.predictions, timestamp, sessionToken });
});

export const queryPlace = createAsyncThunk('location/queryPlace', async (place, thunkAPI) => {
  let { sessionToken, placeId } = thunkAPI.getState().shop.location;

  const data = await new Promise((resolve, reject) => {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({ placeId: place.place_id, sessionToken }, (result, status) => {
      let timestamp = Date.now();
      sessionToken = new window.google.maps.places.AutocompleteSessionToken();
      const formattedAddress = result.formatted_address;
      const address = formattedAddress.substring(0, formattedAddress.lastIndexOf(','));

      resolve({
        coords: { lat: result.geometry.location.lat(), lon: result.geometry.location.lng() },
        timestamp,
        address,
        placeId,
        sessionToken,
      });
      // TODO: Handle error (best way would be not to use the google api !library!, but rather try to use the google REST endpoint via fetch or XMLHTTPREQUEST...)
    });
  });

  return Promise.resolve(data);
});
