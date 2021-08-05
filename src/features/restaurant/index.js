import { combineReducers } from 'redux';

import restaurant from './restaurant';
import location from './location';

export default combineReducers({ restaurant, location });
