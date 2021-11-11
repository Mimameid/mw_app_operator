import { createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const fetchDiscounts = createAsyncThunk('discounts/fetchDiscounts', async (thunkAPI) => {
  const fetchParams = createFetchParams('owner/discounts/discounts', 'GET');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Speichern der Kategorie.', response.status);
  }
});

export const createDiscount = createAsyncThunk('discounts/createDiscount', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/discounts/discounts', 'POST', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Speichern der Kategorie.', response.status);
  }
});

export const updateDiscount = createAsyncThunk('discounts/updateDiscount', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/discounts/discounts', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Aktualisieren der Kategorie.', response.status);
  }
});

export const deleteDiscount = createAsyncThunk('discounts/deleteDiscount', async (id, thunkAPI) => {
  const path = `owner/discounts/discounts/${id}`;
  const fetchParams = createFetchParams(path, 'DELETE');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(id);
  } else {
    return createError('Fehler beim Löschen der Kategorie.', response.status);
  }
});

export const setActive = createAsyncThunk('discounts/setActive', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/discounts/discounts/active', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Ändern der Verfügbarkeit.', response.status);
  }
});
