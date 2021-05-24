import { combineReducers } from 'redux';

import drawerState from './drawerState/reducer';
import deliveryZone from './deliveryZone';
import userState from './userState';

export default combineReducers({ drawerState, deliveryZone, userState });
