import { createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const createChoice = createAsyncThunk('choices/createChoice', async (data, thunkAPI) => {
  let { products, ...choice } = data;
  choice = { ...choice, subs: [] };

  const fetchParams = createFetchParams('owner/menus/choices', 'POST', { products, choice });
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Speichern der Optiongruppe.', response.status);
  }
});

export const updateChoice = createAsyncThunk('products/updateChoice', async (data, thunkAPI) => {
  let { products, updated, created, ...choice } = data;

  const fetchParams = createFetchParams('owner/menus/choices', 'PUT', { products, choice });
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Aktualisieren der Optiongruppe.', response.status);
  }
});

export const deleteChoice = createAsyncThunk('choices/deleteChoice', async (id, thunkAPI) => {
  const path = `owner/menus/choices/${id}`;
  const fetchParams = createFetchParams(path, 'DELETE');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(id);
  } else {
    return createError('Fehler beim Löschen der Optiongruppe.', response.status);
  }
});

export const setSubs = createAsyncThunk('choices/setSubs', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/menus/choices/subs', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Erstellen der Option.', response.status);
  }
});

export const removeSub = createAsyncThunk('choices/removeSub', async (data, thunkAPI) => {
  const path = `owner/menus/choices/${data.choiceId}/subs/${data.subId}`;
  const fetchParams = createFetchParams(path, 'DELETE');

  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Löschen der Option.', response.status);
  }
});
