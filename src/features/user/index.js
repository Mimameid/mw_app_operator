import { combineReducers } from 'redux';

import auth from './auth/authSlice';
import deliveryAreas from './deliveryAreas/deliveryAreasSlice';

export default combineReducers({ auth, deliveryAreas });
