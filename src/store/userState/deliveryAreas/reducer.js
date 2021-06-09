import { DELIVERY_AREAS_REQUEST, DELIVERY_AREAS_SUCCESS, DELIVERY_AREAS_ERROR } from './types';
import STATUS_CODE from '../../../constants';

const initialState = {
  statusCode: 0,
  statusMessage: '',
};

function userStateReducer(state = initialState, action) {
  switch (action.type) {
    case DELIVERY_AREAS_REQUEST:
      return {
        ...state,
        statusCode: STATUS_CODE.REQUEST,
        statusMessage: action.payload,
      };
    case DELIVERY_AREAS_SUCCESS:
      return {
        ...state,
        statusCode: STATUS_CODE.SUCCESS,
        statusMessage: action.payload,
      };
    case DELIVERY_AREAS_ERROR:
      return {
        ...state,
        statusCode: STATUS_CODE.ERROR,
        statusMessage: action.payload,
      };
    default:
      return state;
  }
}

export default userStateReducer;
