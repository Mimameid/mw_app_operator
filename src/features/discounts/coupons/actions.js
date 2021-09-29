import { createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const fetchCoupons = createAsyncThunk('coupons/fetchCoupons', async (thunkAPI) => {
  const fetchParams = createFetchParams('owner/discounts/coupons', 'GET');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Speichern der Kategorie.', response.status);
  }
});

export const createCoupon = createAsyncThunk('coupons/createCoupon', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/discounts/coupons', 'POST', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Speichern der Kategorie.', response.status);
  }
});

export const updateCoupon = createAsyncThunk('coupons/updateCoupon', async (data, thunkAPI) => {
  const { codes, ...updateData } = data;
  const fetchParams = createFetchParams('owner/discounts/coupons', 'PUT', updateData);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Fehler beim Aktualisieren der Kategorie.', response.status);
  }
});

export const deleteCoupon = createAsyncThunk('coupons/deleteCoupon', async (id, thunkAPI) => {
  const path = `owner/discounts/coupons/${id}`;
  const fetchParams = createFetchParams(path, 'DELETE');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return Promise.resolve(id);
  } else {
    return createError('Fehler beim Löschen der Kategorie.', response.status);
  }
});
