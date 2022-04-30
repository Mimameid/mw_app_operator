import { createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const createCategory = createAsyncThunk('categories/createCategory', async (data, thunkAPI) => {
  let { menus, ...category } = data;
  category = { ...category, products: [] };

  const fetchParams = createFetchParams('owner/menus/categories', 'POST', { menus, category });
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Speichern der Kategorie.', response.status);
  }
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (data, thunkAPI) => {
  let { menus, created, updated, ...category } = data;

  const fetchParams = createFetchParams('owner/menus/categories', 'PUT', { menus, category });
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
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

export const setProducts = createAsyncThunk('categories/setProducts', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/menus/categories/products', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Erstellen des Artikel.', response.status);
  }
});

export const removeProduct = createAsyncThunk('categories/removeProduct', async (data, thunkAPI) => {
  const path = `owner/menus/categories/${data.categoryId}/products/${data.productId}`;
  const fetchParams = createFetchParams(path, 'DELETE');

  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Entfernen des Angebots.', response.status);
  }
});
