import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';
import { colors } from 'features/deliveryAreas/areas/utils';

export const setAreas = createAction('areas/setAreas');
export const setVersion = createAction('areas/setVersion');
export const createArea = createAction('areas/createArea');
export const removeArea = createAction('areas/removeArea');
export const saveArea = createAction('areas/saveArea');
export const activateArea = createAction('areas/activateArea');
export const deactivateArea = createAction('areas/deactivateArea');
export const activatePolygon = createAction('areas/activatePolygon');
export const addPolygon = createAction('areas/addPolygon');
export const addEmptyPolygon = createAction('areas/addEmptyPolygon');
export const removePolygon = createAction('areas/removePolygon');
export const rotatePolygon = createAction('areas/rotatePolygon');
export const addVertex = createAction('areas/addVertex');
export const updateVertex = createAction('areas/updateVertex');
export const removeVertex = createAction('areas/removeVertex');
export const setMinimumOrderValue = createAction('areas/setMinimumOrderValue');
export const setDeliveryFee = createAction('areas/setDeliveryFee');

export const fetchAreas = createAsyncThunk('deliveryAreas/areas/fetchAreas', async (_, thunkAPI) => {
  const fetchParams = createFetchParams('owner/areas/deliveryAreas', 'GET');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    colors.resetColors();
    let areaNumberCounter = 0;
    const areas = data.areas.map((entry, areaIndex) => {
      return {
        areaNumber: areaNumberCounter++,
        // convert lng/lat to lat/lng order to conform with leaflet specification
        areaPolygons: entry.area.coordinates.map((polygon, index) => {
          return polygon.map((ring, index) => {
            return ring.map((vertex, index) => {
              return (vertex = [vertex[1], vertex[0]]);
            });
          });
        }),

        deliveryFee: entry.deliveryFee,
        minimumOrderValue: entry.minimumOrderValue,
        color: colors.getColor(),
      };
    });
    return Promise.resolve({ areas, areaNumberCounter, version: data.version });
  } else {
    return createError('Fehler beim Laden der Liefergebiete.', response.status);
  }
});

export const updateAreas = createAsyncThunk('deliveryAreas/areas/updateAreas', async (areas, thunkAPI) => {
  const data = {
    areas: areas.areas.map((area, _) => ({
      areaPolygons: area.areaPolygons,
      deliveryFee: area.deliveryFee,
      minimumOrderValue: area.minimumOrderValue,
    })),
    version: areas.version,
  };

  const fetchParams = createFetchParams('owner/areas/deliveryAreas', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    thunkAPI.dispatch(setVersion(data));
    return Promise.resolve({ data, message: 'Liefergebiete erfolgreich gespeichert.' });
  } else {
    return createError('Liefergebiete konnten nicht gespeichert werden.', response.status);
  }
});

export const fetchArea = createAsyncThunk('deliveryAreas/areas/fetchArea', async (plz, thunkAPI) => {
  const fetchParams = createFetchParams('owner/areas/' + plz, 'GET');
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    if (data.length < 1) {
      return Promise.reject('PLZ existiert nicht!');
    }

    return Promise.resolve({ data, message: 'PLZ erfolgreich geladen.' });
  } else {
    return createError('Fehler beim Laden der PLZ Daten.', response.status);
  }
});
