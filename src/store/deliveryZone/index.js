import { combineReducers } from 'redux';

import mode from './mode/reducer';
import areaData from './areaData/reducer';

export default combineReducers({ mode, areaData });
