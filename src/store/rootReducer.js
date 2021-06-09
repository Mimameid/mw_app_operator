import { combineReducers } from 'redux';

import drawer from './drawer/reducer';
import deliveryAreas from './deliveryAreas';
import restaurant from './restaurant';
import userState from './userState';
import statusCode from './statusCode/reducer';

export default combineReducers({ drawer, deliveryAreas, restaurant, userState, statusCode });
