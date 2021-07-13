import { combineReducers } from 'redux';

import subs from './subs/subsSlice';
import choices from './choices/choicesSlice';
import dishes from './dishes/dishesSlice';
import categories from './categories/categoriesSlice';
import menus from './menus/menusSlice';
import views from './views/viewsSlice';

import fetchRestaurantData from './fetchRestaurantData/reducer';

export default combineReducers({ subs, choices, dishes, categories, menus, views, fetchRestaurantData });
