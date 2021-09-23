import { combineReducers } from 'redux';

import discounts from './discounts/slice';
import views from './views/slice';

export default combineReducers({ discounts, views });
