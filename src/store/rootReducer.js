import { combineReducers } from 'redux';

import drawerState from './drawerState/reducer';
import deliveryZoneState from './deliveryZoneState/reducer';

export default combineReducers({ drawerState, deliveryZoneState });
