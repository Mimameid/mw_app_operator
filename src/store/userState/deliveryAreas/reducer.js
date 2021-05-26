import { DELIVERY_AREAS_REQUEST, DELIVERY_AREAS_SUCCESS, DELIVERY_AREAS_ERROR } from './types';

const initialState = {
  statusCode: 0,
  errorMessage: '',
};

function userStateReducer(state = initialState, action) {
  switch (action.type) {
    case DELIVERY_AREAS_REQUEST:
      return { ...state, statusCode: action.payload };
    case DELIVERY_AREAS_SUCCESS:
      return { ...state, statusCode: action.payload };
    case DELIVERY_AREAS_ERROR:
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
