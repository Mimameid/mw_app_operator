import { combineReducers } from 'redux';

import drawerState from './drawerState/reducer';
import deliveryZoneState from './deliveryZoneState/reducer';
import userState from './userState/reducer';

export default combineReducers({ drawerState, deliveryZoneState, userState });
