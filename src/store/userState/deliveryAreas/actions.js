import { DELIVERY_AREAS_REQUEST, DELIVERY_AREAS_SUCCESS, DELIVERY_AREAS_ERROR } from './types';

import { setLoggedIn } from '../auth/actions';
import { loadAreas } from '../../deliveryZone/areaData/actions';
import { resetChanged } from '../../deliveryZone/mode/actions';
import { setStatusSuccess } from '../../statusCode/actions';
import STATUS_CODE from '../../../constants';

function deliveryAreasRequest() {
  return {
    type: DELIVERY_AREAS_REQUEST,
    payload: STATUS_CODE.REQUEST,
  };
}

function deliveryAreasError(errorMessage) {
  return {
    type: DELIVERY_AREAS_ERROR,
    payload: { statusCode: STATUS_CODE.ERROR, errorMessage },
  };
}

function deliveryAreasSuccess() {
  return {
    type: DELIVERY_AREAS_SUCCESS,
    payload: STATUS_CODE.SUCCESS,
  };
}

export function fetchDeliveryAreas() {
  return (dispatch) => {
    dispatch(deliveryAreasRequest());

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

          dispatch(deliveryAreasError());
        }
      })
      .then((data) => {
        dispatch(loadAreas(data));
        dispatch(resetChanged());
        dispatch(deliveryAreasSuccess());
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function submitDeliveryAreas(areas) {
  return (dispatch) => {
    const data = areas.map((area, _) => ({
      areaPolygons: area.areaPolygons,
      deliveryFee: area.deliveryFee,
      minimumOrderValue: area.minimumOrderValue,
    }));

    const url = new URL('owners/deliveryAreas', process.env.REACT_APP_API_URL);

    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    };

    fetch(url.href, options)
      .then((response) => {
        if (response.ok) {
          dispatch(setStatusSuccess('Liefergebiete erfolgreich aktualisiert.'));
          dispatch(deliveryAreasSuccess());
          dispatch(resetChanged());
        } else {
          dispatch(deliveryAreasError());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
