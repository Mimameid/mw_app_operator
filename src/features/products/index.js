import { combineReducers } from 'redux';

import subs from './subs/slice';
import choices from './choices/slice';
import products from './products/slice';
import categories from './categories/slice';
import menus from './menus/slice';
import views from './views/slice';

export default combineReducers({ subs, choices, products, categories, menus, views });
