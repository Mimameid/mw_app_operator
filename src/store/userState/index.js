import { combineReducers } from 'redux';

import auth from './auth/reducer';
import deliveryAreas from './deliveryAreas/reducer';

export default combineReducers({ auth, deliveryAreas });
