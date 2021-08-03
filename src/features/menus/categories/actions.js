import { createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const createCategory = createAsyncThunk('categories/createCategory', async (data, thunkAPI) => {
  let { menus, ...category } = data;
  category = { ...category, dishes: [], created: new Date().toISOString() };

  const fetchParams = createFetchParams('owner/menus/categories', 'POST', { menus, category });
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve({ menus, category });
  } else {
    return createError('Fehler beim Speichern der Kategorie.', response.status);
  }
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (data, thunkAPI) => {
  let { menus, ...category } = data;
  const fetchParams = createFetchParams('owner/menus/categories', 'PUT', { menus, category });
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve({ menus, category });
  } else {
    return createError('Fehler beim Aktualisieren der Kategorie.', response.status);
  }
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id, thunkAPI) => {
  const path = `owner/menus/categories/${id}`;
  const fetchParams = createFetchParams(path, 'DELETE');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(id);
  } else {
    return createError('Fehler beim Löschen der Kategorie.', response.status);
  }
});

export const addDishes = createAsyncThunk('categories/addDishes', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/menus/categories/dishes', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Hinzufügen der Speise.', response.status);
  }
});

export const removeDish = createAsyncThunk('categories/removeDish', async (data, thunkAPI) => {
  const path = `owner/menus/categories/${data.categoryId}/dishes/${data.dishId}`;
  const fetchParams = createFetchParams(path, 'DELETE');

  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Entfernen der Speise.', response.status);
  }
});
