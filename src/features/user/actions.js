import { createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const authenticate = createAsyncThunk('user/auth', async (_, thunkAPI) => {
  const fetchParams = createFetchParams('auth', 'GET');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return response.data;
  } else {
    return createError('Sie sind nicht angemeldet.', response.status);
  }
});

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  const fetchParams = createFetchParams('auth/logout', 'GET');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  return response.data;
});

export const login = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
  const fetchParams = createFetchParams('auth/login', 'POST', credentials);
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return response.data;
  } else {
    return Promise.reject('Passwort oder Benutzername falsch.');
  }
});
