import { createAsyncThunk } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';

export const fetchShop = createAsyncThunk('shop/shop/fetchShop', async (thunkAPI) => {
  const fetchParams = createFetchParams('owner/shop', 'GET');
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else {
    return createError('Shop noch nicht erstellt.', response.status);
  }
});

export const updateShop = createAsyncThunk('shop/shop/updateShop', async (shopData, thunkAPI) => {
  delete shopData.shopId;
  delete shopData.isActive;
  delete shopData.updated;
  delete shopData.created;
  const fetchParams = createFetchParams('owner/shop/', 'PUT', shopData);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    return Promise.resolve({ data, message: 'Daten erfolgreich aktualisiert.' });
  } else {
    return createError('Fehler beim Aktualisieren der Daten.', response.status);
  }
});

export const createShop = createAsyncThunk('owner/shop/createShop', async (shopData, thunkAPI) => {
  shopData.openingHours = JSON.parse(JSON.stringify(shopData.openingHours));
  delete shopData.updated;
  delete shopData.created;
  const fetchParams = createFetchParams('owner/shop/create', 'POST', shopData);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    const data = await response.json();
    return Promise.resolve({ data, message: 'Shop erfolgreich erstellt.' });
  } else {
    return createError('Fehler beim Erstellen des Shops.', response.status);
  }
});

export const updateShopActive = createAsyncThunk('owner/shop/updateShopActive', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/shop/active', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    return Promise.resolve({ message: 'Shop Aktivierung erfolgreich aktualisiert.' });
  } else {
    return createError('Fehler bei Aktualisierung der Shop Aktivierung.', response.status);
  }
});

export const updateShopOpen = createAsyncThunk('owner/shop/updateShopOpen', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/shop/open', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    return Promise.resolve({ message: 'Shop Öffnung erfolgreich aktualisiert.' });
  } else {
    return createError('Fehler bei Aktualisierung der Shop Öffnung.', response.status);
  }
});

export const updateShopDelivery = createAsyncThunk('owner/shop/updateShopDelivery', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/shop/delivery', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    return Promise.resolve({ message: 'Shop Lieferung erfolgreich aktualisiert.' });
  } else {
    return createError('Fehler bei Aktualisierung der Shop Lieferung.', response.status);
  }
});

export const updateShopPickup = createAsyncThunk('owner/shop/updateShopPickup', async (data, thunkAPI) => {
  const fetchParams = createFetchParams('owner/shop/pickup', 'PUT', data);
  const response = await fetch(fetchParams.url.href, fetchParams.options);

  if (response.ok) {
    return Promise.resolve({ message: 'Shop Abholung erfolgreich aktualisiert.' });
  } else {
    return createError('Fehler bei Aktualisierung der Shop Abholung.', response.status);
  }
});
