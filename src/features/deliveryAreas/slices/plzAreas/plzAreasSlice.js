import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createFetchParams } from 'common/utils/utils';
import { addPolygon, createArea, saveArea } from 'features/deliveryAreas/slices/areaData/actions';
import STATUS_CODE from 'common/constants';

export const fetchArea = createAsyncThunk('plzAreas/fetchArea', async (plz, thunkAPI) => {
  const fetchParams = createFetchParams('owner/areas/' + plz, 'GET');
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    if (data.length < 1) {
      return Promise.reject('PLZ existiert nicht!');
    }
    thunkAPI.dispatch(createArea());
    thunkAPI.dispatch(addPolygon(data['area']));
    thunkAPI.dispatch(saveArea());

    return Promise.resolve('PLZ erfolgreich geladen.');
  } else {
    return Promise.reject('PLZ existiert nicht.');
  }
});

const initialState = {
  statusCode: 0,
  statusMessage: '',
};

const plzAreas = createSlice({
  name: 'plzAreas',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArea.rejected, (state, action) => {
      state.statusCode = STATUS_CODE.ERROR;
      state.errorMessage = action.error.message;
    });
    builder.addCase(fetchArea.pending, (state, action) => {
      state.statusCode = action.payload;
    });
    builder.addCase(fetchArea.fulfilled, (state, action) => {
      state.statusCode = action.payload;
      state.loggedIn = true;
    });
  },
});

export default plzAreas.reducer;
