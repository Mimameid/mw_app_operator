import { createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const createProduct = createAsyncThunk('products/createProduct', async (data, thunkAPI) => {
  let { categories, ...product } = data;
  product = { ...product, choices: [] };

  const fetchParams = createFetchParams('owner/menus/products', 'POST', { categories, product });
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Speichern des Angebots.', response.status);
  }
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (data, thunkAPI) => {
  let { categories, created, updated, ...product } = data;

  const fetchParams = createFetchParams('owner/menus/products', 'PUT', { categories, product });
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Aktualisieren des Angebots.', response.status);
  }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, thunkAPI) => {
  const path = `owner/menus/products/${id}`;
  const fetchParams = createFetchParams(path, 'DELETE');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(id);
  } else {
    return createError('Fehler beim Löschen des Angebots.', response.status);
  }
});

export const setChoices = createAsyncThunk('products/setChoices', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/menus/products/choices', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Erstellen der Optiongruppe.', response.status);
  }
});

export const removeChoice = createAsyncThunk('products/removeChoice', async (data, thunkAPI) => {
  const path = `owner/menus/products/${data.productId}/choices/${data.choiceId}`;
  const fetchParams = createFetchParams(path, 'DELETE');

  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Löschen der Optiongruppe.', response.status);
  }
});

export const setAvailable = createAsyncThunk('products/setAvailable', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/menus/products/available', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Ändern der Verfügbarkeit.', response.status);
  }
});
