import {
  SET_AREAS,
  CREATE_AREA,
  DELETE_AREA,
  SAVE_AREA,
  ACTIVATE_AREA,
  DEACTIVATE_AREA,
  ACTIVATE_POLYGON,
  ADD_POLYGON,
  ADD_EMPTY_POLYGON,
  REMOVE_POLYGON,
  ROTATE_POLYGON,
  ADD_VERTEX,
  REMOVE_VERTEX,
  SELECT_VERTEX,
  UNSELECT_VERTEX,
  UPDATE_VERTEX,
  SET_MINIMUM_ORDER_VALUE,
  SET_DELIVERY_FEE,
} from './types';

import { getColor } from './utils';

export function saveArea() {
  return {
    type: SAVE_AREA,
  };
}

export function createArea() {
  return {
    type: CREATE_AREA,
    payload: getColor(),
  };
}

export function deleteArea(areaNumber) {
  return {
    type: DELETE_AREA,
    payload: areaNumber,
  };
}

export function activateArea(areaNumber) {
  return {
    type: ACTIVATE_AREA,
    payload: areaNumber,
  };
}

export function deactivateArea() {
  return {
    type: DEACTIVATE_AREA,
  };
}

export function activatePolygon(polygonIndex) {
  return {
    type: ACTIVATE_POLYGON,
    payload: polygonIndex,
  };
}

export function addPolygon(polygon) {
  return {
    type: ADD_POLYGON,

    payload: polygon,
  };
}

export function addEmptyPolygon() {
  return {
    type: ADD_EMPTY_POLYGON,
  };
}

export function removePolygon() {
  return {
    type: REMOVE_POLYGON,
  };
}

export function rotatePolygon() {
  return {
    type: ROTATE_POLYGON,
  };
}

export function addVertex(vertex) {
  return {
    type: ADD_VERTEX,
    payload: vertex,
  };
}

export function removeVertex() {
  return {
    type: REMOVE_VERTEX,
  };
}

export function selectVertex(index) {
  return {
    type: SELECT_VERTEX,
    payload: index,
  };
}

export function unselectVertex() {
  return {
    type: UNSELECT_VERTEX,
  };
}

export function updateVertex(coords) {
  return {
    type: UPDATE_VERTEX,
    payload: coords,
  };
}

export function setMinimumOrderValue(value) {
  return {
    type: SET_MINIMUM_ORDER_VALUE,
    payload: value,
  };
}
export function setDeliveryFee(value) {
  return {
    type: SET_DELIVERY_FEE,
    payload: value,
  };
}
export function setAreas(areaData) {
  return {
    type: SET_AREAS,
    payload: areaData,
  };
}

export function loadAreas(data) {
  return (dispatch) => {
    let areaNumberCounter = 0;
    const areas = data.map((entry, areaIndex) => {
      return {
        areaNumber: areaNumberCounter++,
        // convert lng/lat to lat/lng order to conform with leaflet specification
        areaPolygons: entry.area.coordinates.map((polygon, index) => {
          return polygon.map((ring, index) => {
            return ring.map((vertex, index) => {
              return (vertex = [vertex[1], vertex[0]]);
            });
          });
        }),

        deliveryFee: entry.delivery_fee,
        minimumOrderValue: entry.minimum_order_value,
        color: getColor(),
      };
    });
    dispatch(setAreas({ areas, areaNumberCounter }));
  };
}

export function createAreaFromUserData() {}
