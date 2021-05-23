import { DELIVERY_AREA_REQUEST, DELIVERY_AREA_SUCCESS, DELIVERY_AREA_ERROR } from './types';

import { setLoggedIn } from '../authState/action';
import STATUS_CODE from '../../../constants';

function deliveryAreaRequest() {
  return {
    type: DELIVERY_AREA_REQUEST,
    payload: STATUS_CODE.REQUEST,
  };
}

function deliveryAreaError(errorMessage) {
  return {
    type: DELIVERY_AREA_ERROR,
    payload: { statusCode: STATUS_CODE.ERROR, errorMessage },
  };
}

function deliveryAreaSuccess() {
  return {
    type: DELIVERY_AREA_SUCCESS,
    payload: STATUS_CODE.SUCCESS,
  };
}

export function fetchDeliveryArea() {
  return (dispatch) => {
    dispatch(deliveryAreaRequest());
    console.log('trha');

    const url = new URL('owners/deliveryAreas', process.env.REACT_APP_API_URL);

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
        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 401) {
            dispatch(setLoggedIn(false));
          }
          dispatch(deliveryAreaError());
        }
      })
      .then((data) => {
        dispatch(deliveryAreaSuccess());
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
