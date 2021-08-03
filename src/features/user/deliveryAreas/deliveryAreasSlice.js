import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';
import { loadAreas, setAreasVersion } from 'features/deliveryAreas/slices/areaData/actions';
import { resetChanged } from 'features/deliveryAreas/slices/mode/actions';
import STATUS_CODE from 'common/constants';

export const fetchDeliveryAreas = createAsyncThunk('user/fetchDeliveryAreas', async (_, thunkAPI) => {
  const fetchParams = createFetchParams('owner/areas/deliveryAreas', 'GET');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    thunkAPI.dispatch(loadAreas(data.areas));
    thunkAPI.dispatch(setAreasVersion(data.version));
    thunkAPI.dispatch(resetChanged());
    return Promise.resolve('Liefergebiete erfolgreich geladen.');
  } else {
    return createError('Fehler beim Laden der Liefergebiete.', response.status);
  }
});

export const updateDeliveryAreas = createAsyncThunk('user/updateDeliveryAreas', async (areaData, thunkAPI) => {
  const data = {
    areas: areaData.areas.map((area, _) => ({
      areaPolygons: area.areaPolygons,
      deliveryFee: area.deliveryFee,
      minimumOrderValue: area.minimumOrderValue,
    })),
    version: areaData.version,
  };

  const fetchParams = createFetchParams('owner/areas/deliveryAreas', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    thunkAPI.dispatch(resetChanged());
    thunkAPI.dispatch(setAreasVersion(data));
    return Promise.resolve('Liefergebiete erfolgreich gespeichert.');
  } else {
    return createError('Liefergebiete konnten nicht gespeichert werden.', response.status);
  }
});

const initialState = {
  statusCode: 0,
  statusMessage: '',
};

const deliveryAreas = createSlice({
  name: 'deliveryAreas',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDeliveryAreas.rejected, (state, action) => {
      state.statusCode = STATUS_CODE.ERROR;
      state.errorMessage = action.error.message;
    });
    builder.addCase(fetchDeliveryAreas.pending, (state, action) => {
      state.statusCode = action.payload;
    });
    builder.addCase(fetchDeliveryAreas.fulfilled, (state, action) => {
      state.statusCode = action.payload;
      state.loggedIn = true;
    });
    builder.addCase(updateDeliveryAreas.rejected, (state, action) => {
      state.statusCode = STATUS_CODE.ERROR;
      state.errorMessage = action.error.message;
    });
    builder.addCase(updateDeliveryAreas.pending, (state, action) => {
      state.statusCode = action.payload;
    });
    builder.addCase(updateDeliveryAreas.fulfilled, (state, action) => {
      state.statusCode = action.payload;
      state.loggedIn = true;
    });
  },
});

export default deliveryAreas.reducer;
