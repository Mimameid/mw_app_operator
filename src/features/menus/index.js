import { combineReducers } from 'redux';

import dishes from './dishes/dishesSlice';
import menus from './menus/menusSlice';
import categories from './categories/categoriesSlice';

import fetchRestaurantData from './fetchRestaurantData/reducer';

export default combineReducers({ dishes, menus, categories, fetchRestaurantData });
