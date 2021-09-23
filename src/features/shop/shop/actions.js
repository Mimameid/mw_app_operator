import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const saveOpeningHours = createAction('shop/shop/saveOpeningHours');

export const hasShop = createAsyncThunk('shop/shop/hasShop', async (thunkAPI) => {
  const fetchParams = createFetchParams('owner/shop', 'HEAD');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return;
  } else {
    return createError('Shop noch nicht erstellt.', response.status);
  }
});

export const fetchShop = createAsyncThunk('shop/shop/fetchShop', async (thunkAPI) => {
  const fetchParams = createFetchParams('owner/shop', 'GET');
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Laden der Daten.', response.status);
  }
});

export const updateShop = createAsyncThunk('shop/shop/updateShop', async (data, thunkAPI) => {
  delete data.address;
  data.location = thunkAPI.getState().shop.shop.location;
  data.openingHours = thunkAPI.getState().shop.shop.openingHours;

  const fetchParams = createFetchParams('owner/shop/', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  console.log(data);
  if (response.ok) {
    return Promise.resolve({ data, message: 'Daten erfolgreich aktualisiert.' });
  } else {
    return createError('Fehler beim Aktualisieren der Daten.', response.status);
  }
});

export const createShop = createAsyncThunk('owner/shop/createShop', async (data, thunkAPI) => {
  delete data.address;
  data.location = thunkAPI.getState().shop.shop.location;
  data.openingHours = thunkAPI.getState().shop.shop.openingHours;
  const fetchParams = createFetchParams('owner/shop/create', 'POST', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    return Promise.resolve({ data, message: 'Shop erfolgreich erstellt.' });
  } else {
    return createError('Fehler beim Erstellen des Shops.', response.status);
  }
});
