import { RESTAURANT_DATA_REQUEST, RESTAURANT_DATA_SUCCESS, RESTAURANT_DATA_ERROR } from './types';
import STATUS_CODE from 'constants';

const initialState = {
  statusCode: 0,
  statusMessage: '',
};

function restaurantDataReducer(state = initialState, action) {
  switch (action.type) {
    case RESTAURANT_DATA_REQUEST:
      return {
        ...state,
        statusCode: STATUS_CODE.REQUEST,
        statusMessage: action.payload,
      };
    case RESTAURANT_DATA_SUCCESS:
      return {
        ...state,
        statusCode: STATUS_CODE.SUCCESS,
        statusMessage: action.payload,
      };
    case RESTAURANT_DATA_ERROR:
      return {
        ...state,
        statusCode: STATUS_CODE.ERROR,
        statusMessage: action.payload,
      };

    default:
      return state;
  }
}

export default restaurantDataReducer;
