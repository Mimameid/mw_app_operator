import { combineReducers } from 'redux';

import authState from './authState/reducer';
import deliveryAreaState from './deliveryAreaState/reducer';

export default combineReducers({ authState, deliveryAreaState });
