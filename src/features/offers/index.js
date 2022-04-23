import { combineReducers } from 'redux';

import subs from './subs/slice';
import choices from './choices/slice';
import dishes from './dishes/slice';
import categories from './categories/slice';
import offers from './offers/slice';
import views from './views/slice';

export default combineReducers({ subs, choices, dishes, categories, offers, views });
