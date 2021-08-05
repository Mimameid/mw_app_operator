import { combineReducers } from 'redux';

import subs from './subs/slice';
import choices from './choices/slice';
import dishes from './dishes/slice';
import categories from './categories/slice';
import menus from './menus/slice';
import views from './views/viewsSlice';

export default combineReducers({ subs, choices, dishes, categories, menus, views });