import { createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const createCategory = createAsyncThunk('categories/createCategory', async (data, thunkAPI) => {
  let { offers, ...category } = data;
  category = { ...category, dishes: [] };

  const fetchParams = createFetchParams('owner/offers/categories', 'POST', { offers, category });
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Speichern der Kategorie.', response.status);
  }
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (data, thunkAPI) => {
  let { offers, created, updated, ...category } = data;

  const fetchParams = createFetchParams('owner/offers/categories', 'PUT', { offers, category });
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Aktualisieren der Kategorie.', response.status);
  }
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id, thunkAPI) => {
  const path = `owner/offers/categories/${id}`;
  const fetchParams = createFetchParams(path, 'DELETE');
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    return Promise.resolve(id);
  } else {
    return createError('Fehler beim Löschen der Kategorie.', response.status);
  }
});

export const setDishes = createAsyncThunk('categories/setDishes', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/offers/categories/dishes', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Erstellen der Speise.', response.status);
  }
});

export const removeDish = createAsyncThunk('categories/removeDish', async (data, thunkAPI) => {
  const path = `owner/offers/categories/${data.categoryId}/dishes/${data.dishId}`;
  const fetchParams = createFetchParams(path, 'DELETE');

  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Entfernen der Speise.', response.status);
  }
});