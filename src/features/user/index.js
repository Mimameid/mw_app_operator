import { createSelector, createSlice } from '@reduxjs/toolkit';
import { authenticate, login } from './actions';
import { createShop, fetchShop } from 'features/shop/shop/actions';

const initialState = {
  loggedIn: false,
  authenticated: false,
  shopRegistered: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShop.fulfilled, (state, action) => {
        state.shopRegistered = true;
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.shopRegistered = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggedIn = true;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.authenticated = true;
      })

      .addDefaultCase((state, action) => {
        if (action.type.endsWith('/rejected')) {
          if (action.error.code === '401') {
            state.loggedIn = false;
          }
        }
      });
  },
});

export const selectUserState = createSelector(
  (state) => state.user.loggedIn,
  (state) => state.user.authenticated,
  (state) => state.user.shopRegistered,
  (loggedIn, authenticated, shopRegistered) => {
    return { loggedIn, authenticated, shopRegistered };
  },
);

export const { setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
