import {
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_DATA_ERROR,
  SET_USER_DATA,
  LOGGEDIN_REQUEST,
  LOGGEDIN_SUCCESS,
  LOGGEDIN_ERROR,
  SET_LOGGEDIN,
} from './types';

const initialState = {
  userData: null,
  loggedIn: false,
  loggedInStatusCode: 0,
  userDataStatusCode: 0,
  errorMessage: '',
};

function userStateReducer(state = initialState, action) {
  switch (action.type) {
    case LOGGEDIN_SUCCESS:
      return { ...state, loggedInStatusCode: action.payload, loggedIn: true };
    case LOGGEDIN_ERROR:
      return {
        ...state,
        loggedInStatusCode: action.payload.statusCode,
        errorMessage: action.payload.errorMessage,
        loggedIn: false,
      };
    case LOGGEDIN_REQUEST:
      return { ...state, loggedInStatusCode: action.payload };
    case SET_LOGGEDIN:
      return { ...state, loggedIn: action.payload };
    // User data
    case USER_DATA_SUCCESS:
      return { ...state, userDataStatusCode: action.payload };
    case USER_DATA_ERROR:
      return {
        ...state,
        userDataStatusCode: action.payload.statusCode,
        errorMessage: action.payload.errorMessage,
      };
    case USER_DATA_REQUEST:
      return { ...state, userDataStatusCode: action.payload };
    case SET_USER_DATA:
      return { ...state, userData: action.payload };

    default:
      return state;
  }
}

export default userStateReducer;
