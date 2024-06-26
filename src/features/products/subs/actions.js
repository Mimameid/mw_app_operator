import { createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const createSub = createAsyncThunk('subs/createSub', async (data, thunkAPI) => {
  let { choices, ...sub } = data;

  const fetchParams = createFetchParams('owner/menus/subs', 'POST', { choices, sub });
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Speichern der Option.', response.status);
  }
});

export const updateSub = createAsyncThunk('products/updateSub', async (data, thunkAPI) => {
  let { choices, created, updated, ...sub } = data;

  const fetchParams = createFetchParams('owner/menus/subs', 'PUT', { choices, sub });
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Aktualisieren des Angebots.', response.status);
  }
});

export const deleteSub = createAsyncThunk('products/deleteSub', async (id, thunkAPI) => {
  const path = `owner/menus/subs/${id}`;
  const fetchParams = createFetchParams(path, 'DELETE');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(id);
  } else {
    return createError('Fehler beim Löschen des Angebots.', response.status);
  }
});
