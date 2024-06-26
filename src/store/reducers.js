import { combineReducers } from 'redux';

import frame from 'features/frame';
import mode from 'features/mode';
import deliveryAreas from 'features/deliveryAreas/slices';
import menus from 'features/products';
import discounts from 'features/discounts';
import shop from 'features/shop';
import snackbar from 'features/snackbar/slice';
import user from 'features/user';

const appReducer = combineReducers({
  frame,
  deliveryAreas,
  menus,
  discounts,
  user,
  snackbar,
  shop,
  mode,
});

const reducers = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'user/auth/rejected' || action.type === 'user/logout/fulfilled') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default reducers;
