import { DELIVERY_AREA_REQUEST, DELIVERY_AREA_SUCCESS, DELIVERY_AREA_ERROR } from './types';

const initialState = {
  statusCode: 0,
  errorMessage: '',
};

function userStateReducer(state = initialState, action) {
  switch (action.type) {
    case DELIVERY_AREA_REQUEST:
      return { ...state, statusCode: action.payload };
    case DELIVERY_AREA_SUCCESS:
      return { ...state, statusCode: action.payload };
    case DELIVERY_AREA_ERROR:
      return {
        ...state,
        statusCode: action.payload.statusCode,
        errorMessage: action.payload.errorMessage,
      };

    default:
      return state;
  }
}

export default userStateReducer;
