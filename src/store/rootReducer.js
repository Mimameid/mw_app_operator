import { combineReducers } from 'redux';

import frame from 'features/frame/slice';
import deliveryAreas from 'features/deliveryAreas/slices';
import menus from 'features/menus';
import restaurant from 'features/restaurant/slices';
import snackbar from 'features/snackbar/slice';
import userState from 'features/user';

export default combineReducers({ frame, deliveryAreas, menus, userState, snackbar, restaurant });
