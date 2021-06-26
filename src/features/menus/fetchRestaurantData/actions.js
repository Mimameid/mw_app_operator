import { RESTAURANT_DATA_REQUEST, RESTAURANT_DATA_SUCCESS, RESTAURANT_DATA_ERROR } from './types';
import { setMenus } from 'features/menus/menus/menusSlice';
import { setDishes } from 'features/menus/dishes/dishesSlice';

import { setLoggedIn } from 'store/userState/auth/actions';

function restaurantDataRequest(statusMessage) {
  return {
    type: RESTAURANT_DATA_REQUEST,
    payload: statusMessage,
  };
}

function restaurantDataSuccess(statusMessage) {
  return {
    type: RESTAURANT_DATA_SUCCESS,
    payload: statusMessage,
  };
}

function restaurantDataError(statusMessage) {
  return {
    type: RESTAURANT_DATA_ERROR,
    payload: statusMessage,
  };
}

export function fetchRestaurantData() {
  return (dispatch) => {
    dispatch(restaurantDataRequest());

    const dishesUrl = new URL('owners/dishes', process.env.REACT_APP_API_URL);
    const menusUrl = new URL('owners/menus', process.env.REACT_APP_API_URL);

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

    const dishesPromise = fetch(dishesUrl.href, options);
    const menusPromise = fetch(menusUrl.href, options);
    Promise.all([dishesPromise, menusPromise])
      .then((responses) => {
        return Promise.all(
          responses.map(function (response) {
            if (response.ok) {
              return response.json();
            } else {
              if (response.status === 401) {
                dispatch(setLoggedIn(false));
                throw Error(response.status + ' Not authorized');
              }
              dispatch(restaurantDataError('Fehler beim laden der Menüs'));
              throw Error(response.status);
            }
          }),
        );
      })
      .then((data) => {
        //     dispatch(setDishes(data));
        dispatch(restaurantDataSuccess('Menüs erfolgreich geladen.'));
        console.log('dishes: ' + data[0]);
        console.log('menus: ' + data[1]);
      })
      .catch((error) => {});
  };
}
