import { createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const createChoice = createAsyncThunk('choices/createChoice', async (data, thunkAPI) => {
  let { dishes, ...choice } = data;
  choice = { ...choice, subs: [] };

  const fetchParams = createFetchParams('owner/menus/choices', 'POST', { dishes, choice });
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Speichern der Optiongruppe.', response.status);
  }
});

export const updateChoice = createAsyncThunk('dishes/updateChoice', async (data, thunkAPI) => {
  let { dishes, ...choice } = data;

  const fetchParams = createFetchParams('owner/menus/choices', 'PUT', { dishes, choice });
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    console.log(data);
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

export const addSubs = createAsyncThunk('choices/addSubs', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/menus/choices/subs', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Hinzufügen der Option.', response.status);
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
