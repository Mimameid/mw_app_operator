import { DELIVERY_AREAS_REQUEST, DELIVERY_AREAS_SUCCESS, DELIVERY_AREAS_ERROR } from './types';

import { setLoggedIn } from '../auth/actions';
import { loadAreas } from '../../deliveryAreas/areaData/actions';
import { resetChanged } from '../../deliveryAreas/mode/actions';

function deliveryAreasRequest() {
  return {
    type: DELIVERY_AREAS_REQUEST,
  };
}

function deliveryAreasError(statusMessage) {
  return {
    type: DELIVERY_AREAS_ERROR,
    payload: statusMessage,
  };
}

function deliveryAreasSuccess(statusMessage) {
  return {
    type: DELIVERY_AREAS_SUCCESS,
    payload: statusMessage,
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
            throw Error(response.status + 'Not authorized');
          }

          dispatch(deliveryAreasError('Fehler beim laden der Liefergebiete'));
          throw Error(response.status + 'Error');
        }
      })
      .then((data) => {
        dispatch(loadAreas(data));
        dispatch(resetChanged());
        dispatch(deliveryAreasSuccess('Liefergebiete erfolgreich geladen.'));
      })
      .catch((error) => {});
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
          dispatch(deliveryAreasSuccess('Liefergebiete erfolgreich aktualisiert.'));
          dispatch(resetChanged());
        } else {
          dispatch(deliveryAreasError());
          throw Error(response.status + '');
        }
      })
      .catch((error) => {});
  };
}
