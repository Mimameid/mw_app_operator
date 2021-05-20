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

import STATUS_CODE from '../../constants';

function authenticationRequest() {
  return {
    type: LOGGEDIN_REQUEST,
    payload: STATUS_CODE.REQUEST,
  };
}

function authenticationError(errorMessage) {
  return {
    type: LOGGEDIN_ERROR,
    payload: { statusCode: STATUS_CODE.ERROR, errorMessage },
  };
}

function authenticationSuccess() {
  return {
    type: LOGGEDIN_SUCCESS,
    payload: STATUS_CODE.SUCCESS,
  };
}

export function setLoggedIn(value) {
  return {
    type: SET_LOGGEDIN,
    payload: value,
  };
}

function userDataRequest() {
  return {
    type: USER_DATA_REQUEST,
    payload: STATUS_CODE.REQUEST,
  };
}

function userDataError(errorMessage) {
  return {
    type: USER_DATA_ERROR,
    payload: { statusCode: STATUS_CODE.ERROR, errorMessage },
  };
}

function userDataSuccess() {
  return {
    type: USER_DATA_SUCCESS,
    payload: STATUS_CODE.SUCCESS,
  };
}
function setData(data) {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
}

export function authenticate() {
  return async (dispatch) => {
    dispatch(authenticationRequest());

    const url = new URL('owners', process.env.REACT_APP_API_URL);
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };

    const response = await fetch(url.href, options);
    if (response.ok) {
      dispatch(authenticationSuccess());
    } else {
      dispatch(authenticationError());
    }
  };
}

export function fetchUserData() {
  return (dispatch) => {
    dispatch(userDataRequest());

    const url = new URL('owners/data', process.env.REACT_APP_API_URL);
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };

    fetch(url.href, options)
      .then((response) => {
        dispatch(setData(response));
        dispatch(userDataSuccess());
      })
      .catch((error) => {
        dispatch(userDataError());
      });
  };
}
