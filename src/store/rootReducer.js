import { combineReducers } from 'redux';

import drawer from 'features/drawer/drawerSlice';
import deliveryAreas from 'features/deliveryAreas/slices';
import menus from 'features/menus';
import userState from './userState';
import statusCode from './statusCode/reducer';
import status from 'features/statusCode/statusCodeSlice';

export default combineReducers({ drawer, deliveryAreas, menus, userState, statusCode, status });
