import { createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const createDish = createAsyncThunk('dishes/createDish', async (data, thunkAPI) => {
  let { categories, ...dish } = data;
  dish = { ...dish, choices: [], created: new Date().toISOString() };

  const fetchParams = createFetchParams('owner/menus/dishes', 'POST', { categories, dish });
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve({ categories, dish });
  } else {
    return createError('Fehler beim Speichern der Speise.', response.status);
  }
});

export const updateDish = createAsyncThunk('dishes/updateDish', async (data, thunkAPI) => {
  let { categories, ...dish } = data;

  const fetchParams = createFetchParams('owner/menus/dishes', 'PUT', { categories, dish });
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve({ categories, dish });
  } else {
    return createError('Fehler beim Aktualisieren der Speise.', response.status);
  }
});

export const deleteDish = createAsyncThunk('dishes/deleteDish', async (id, thunkAPI) => {
  const path = `owner/menus/dishes/${id}`;
  const fetchParams = createFetchParams(path, 'DELETE');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(id);
  } else {
    return createError('Fehler beim Löschen der Speise.', response.status);
  }
});

export const addChoices = createAsyncThunk('dishes/addChoices', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/menus/dishes/choices', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Hinzufügen der Optiongruppe.', response.status);
  }
});

export const removeChoice = createAsyncThunk('dishes/removeChoice', async (data, thunkAPI) => {
  const path = `owner/menus/dishes/${data.dishId}/choices/${data.choiceId}`;
  const fetchParams = createFetchParams(path, 'DELETE');

  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Löschen der Optiongruppe.', response.status);
  }
});

export const setAvailable = createAsyncThunk('dishes/setAvailable', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/menus/dishes/available', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Ändern der Verfügbarkeit.', response.status);
  }
});
