import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { createError, createFetchParams } from 'common/utils/utils';
import STATUS_CODE from 'common/constants';

export const authenticate = createAsyncThunk('user/auth', async (_, thunkAPI) => {
  const fetchParams = createFetchParams('auth', 'GET');
  const response = await fetch(fetchParams.url.href, fetchParams.options);
  if (response.ok) {
    return response.data;
  } else {
    return createError('Fehler beim Speichern der Kategorie.', response.status);
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

const initialState = {
  loggedIn: false,
  statusCode: 0,
  errorMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state, action) => {
      state.statusCode = STATUS_CODE.SUCCESS;
      state.loggedIn = false;
    });
    builder.addMatcher(isAnyOf(authenticate.rejected, login.rejected), (state, action) => {
      state.statusCode = STATUS_CODE.ERROR;
      state.errorMessage = action.error.message;
      state.loggedIn = false;
    });
    builder.addMatcher(isAnyOf(authenticate.pending, login.pending), (state, action) => {
      state.statusCode = STATUS_CODE.REQUEST;
    });
    builder.addMatcher(isAnyOf(authenticate.fulfilled, login.fulfilled), (state, action) => {
      state.statusCode = STATUS_CODE.SUCCESS;
      state.loggedIn = true;
    });
    builder.addDefaultCase((state, action) => {
      if (action.type.endsWith('/rejected')) {
        if (action.error.code === '401') {
          state.loggedIn = false;
        }
        state.statusCode = STATUS_CODE.ERROR;
        state.errorMessage = action.error.message;
      }
    });
  },
});

export const { setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
