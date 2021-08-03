import { combineReducers } from 'redux';

import mode from './mode/reducer';
import areaData from './areaData/reducer';
import plzArea from './plzAreas/plzAreasSlice';

export default combineReducers({ mode, areaData, plzArea });
