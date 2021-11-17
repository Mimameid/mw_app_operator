import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const saveOpeningHours = createAction('shop/shop/saveOpeningHours');

export const fetchShop = createAsyncThunk('shop/shop/fetchShop', async (thunkAPI) => {
  const fetchParams = createFetchParams('owner/shop', 'GET');
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Shop noch nicht erstellt.', response.status);
  }
});

export const updateShop = createAsyncThunk('shop/shop/updateShop', async (data, thunkAPI) => {
  delete data.shopId;
  data.openingHours = JSON.parse(JSON.stringify(data.openingHours));
  const fetchParams = createFetchParams('owner/shop/', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    return Promise.resolve({ data, message: 'Daten erfolgreich aktualisiert.' });
  } else {
    return createError('Fehler beim Aktualisieren der Daten.', response.status);
  }
});

export const createShop = createAsyncThunk('owner/shop/createShop', async (data, thunkAPI) => {
  data.openingHours = JSON.parse(JSON.stringify(data.openingHours));
  const fetchParams = createFetchParams('owner/shop/create', 'POST', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    return Promise.resolve({ data, message: 'Shop erfolgreich erstellt.' });
  } else {
    return createError('Fehler beim Erstellen des Shops.', response.status);
  }
});

export const setActive = createAsyncThunk('owner/shop/setActive', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/shop/active', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    return Promise.resolve({ message: 'Shop erfolgreich erstellt.' });
  } else {
    return createError('Fehler beim Erstellen des Shops.', response.status);
  }
});
