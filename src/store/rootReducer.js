import { combineReducers } from 'redux';

import drawerState from './drawerState/reducer';
import deliveryZoneState from './deliveryZoneState/reducer';
import activePolygonReducer from './deliveryZoneState/activePolygonState/reducer';

export default combineReducers({ drawerState, deliveryZoneState, activePolygonReducer });
