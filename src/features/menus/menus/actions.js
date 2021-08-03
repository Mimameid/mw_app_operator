import { createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const fetchAll = createAsyncThunk('menus/fetchAll', async () => {
  const fetchParams = createFetchParams('owner/menus', 'GET');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Laden der Menüdaten.', response.status);
  }
});

export const createMenu = createAsyncThunk('menus/createMenu', async (menu, thunkAPI) => {
  menu = { ...menu, categories: [], created: new Date().toISOString() };

  const fetchParams = createFetchParams('owner/menus/menus', 'PUT', menu);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(menu);
  } else {
    return createError('Fehler beim Speichern des Menüs.', response.status);
  }
});

export const updateMenu = createAsyncThunk('menus/updateMenu', async (menu, thunkAPI) => {
  const fetchParams = createFetchParams('owner/menus/menus', 'PUT', menu);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(menu);
  } else {
    return createError('Fehler beim Aktualisieren des Menüs.', response.status);
  }
});

export const deleteMenu = createAsyncThunk('menus/deleteMenu', async (id, thunkAPI) => {
  const path = `owner/menus/menus/${id}`;
  const fetchParams = createFetchParams(path, 'DELETE');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(id);
  } else {
    return createError('Fehler beim Löschen des Menüs.', response.status);
  }
});

export const addCategories = createAsyncThunk('menus/addCategories', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/menus/menus/categories', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Hinzufügen der Kategorie.', response.status);
  }
});

export const removeCategory = createAsyncThunk('menus/removeCategory', async (data, thunkAPI) => {
  const path = `owner/menus/menus/${data.menuId}/categories/${data.categoryId}`;
  const fetchParams = createFetchParams(path, 'DELETE');

  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Entfernen der Kategorie.', response.status);
  }
});
