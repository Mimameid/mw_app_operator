import { LOGGEDIN_REQUEST, LOGGEDIN_SUCCESS, LOGGEDIN_ERROR, SET_LOGGEDIN } from './types';

const initialState = {
  loggedIn: false,
  statusCode: 0,
  errorMessage: '',
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGGEDIN_SUCCESS:
      return { ...state, statusCode: action.payload, loggedIn: true };
    case LOGGEDIN_ERROR:
      return {
        ...state,
        statusCode: action.payload.statusCode,
        errorMessage: action.payload.errorMessage,
        loggedIn: false,
      };
    case LOGGEDIN_REQUEST:
      return { ...state, statusCode: action.payload };
    case SET_LOGGEDIN:
      return { ...state, loggedIn: action.payload };
    default:
      return state;
  }
}

export default authReducer;
