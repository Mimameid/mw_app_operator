import { createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const fetchAllOffers = createAsyncThunk('offers/fetchAllOffers', async () => {
  const fetchParams = createFetchParams('owner/offers', 'GET');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Laden der Speisekartedaten.', response.status);
  }
});

export const createOffer = createAsyncThunk('offers/createOffer', async (offer, thunkAPI) => {
  offer = { ...offer, categories: [] };

  const fetchParams = createFetchParams('owner/offers/offers', 'POST', offer);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Speichern der Speisekarte.', response.status);
  }
});

export const updateOffer = createAsyncThunk('offers/updateOffer', async (data, thunkAPI) => {
  let { created, updated, ...offer } = data;
  const fetchParams = createFetchParams('owner/offers/offers', 'PUT', offer);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Aktualisieren der Speisekarte.', response.status);
  }
});

export const deleteOffer = createAsyncThunk('offers/deleteOffer', async (id, thunkAPI) => {
  const path = `owner/offers/offers/${id}`;
  const fetchParams = createFetchParams(path, 'DELETE');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(id);
  } else {
    return createError('Fehler beim Löschen der Speisekarte.', response.status);
  }
});

export const setCategories = createAsyncThunk('offers/setCategories', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/offers/offers/categories', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Erstellen der Kategorie.', response.status);
  }
});

export const removeCategory = createAsyncThunk('offers/removeCategory', async (data, thunkAPI) => {
  const path = `owner/offers/offers/${data.offerId}/categories/${data.categoryId}`;
  const fetchParams = createFetchParams(path, 'DELETE');

  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Entfernen der Kategorie.', response.status);
  }
});

export const activateOffer = createAsyncThunk('offers/activateOffer', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/offers/offers/active', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Ändern der Verfügbarkeit.', response.status);
  }
});
