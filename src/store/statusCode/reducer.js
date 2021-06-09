import { STATUS_REQUEST, STATUS_ERROR, STATUS_SUCCESS } from './types';
import { DELIVERY_AREAS_ERROR } from '../userState/deliveryAreas/types';
import { RESTAURANT_DATA_ERROR } from '../restaurant/fetchRestaurantData/types';
import STATUS_CODE from '../../constants';

const initialState = { statusCode: 0, statusMessage: '', count: 0 };

function statusCodeReducer(state = initialState, action) {
  switch (action.type) {
    case STATUS_REQUEST:
      return {
        ...state,
        statusCode: STATUS_CODE.REQUEST,
        statusMessage: action.payload,
        count: state.count + 1,
      };
    case STATUS_ERROR:
    case DELIVERY_AREAS_ERROR:
    case RESTAURANT_DATA_ERROR:
      return {
        ...state,
        statusCode: STATUS_CODE.ERROR,
        statusMessage: action.payload,
        count: state.count + 1,
      };
    case STATUS_SUCCESS:
      return {
        ...state,
        statusCode: STATUS_CODE.SUCCESS,
        statusMessage: action.payload,
        count: state.count + 1,
      };
    default:
      return state;
  }
}

export default statusCodeReducer;
