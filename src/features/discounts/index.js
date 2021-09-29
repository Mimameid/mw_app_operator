import { combineReducers } from 'redux';

import discounts from './discounts/slice';
import coupons from './coupons/slice';
import views from './views/slice';

export default combineReducers({ coupons, discounts, views });
