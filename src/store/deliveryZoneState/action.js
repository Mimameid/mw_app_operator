import {
  TOGGLE_DRAWMODE,
  TOGGLE_SELECTMODE,
  TOGGLE_DELETEMODE,
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

export function toggleDrawMode() {
  return {
    type: TOGGLE_DRAWMODE,
  };
}
export function toggleSelectMode() {
  return {
    type: TOGGLE_SELECTMODE,
  };
}
export function toggleDeleteMode() {
  return {
    type: TOGGLE_DELETEMODE,
  };
}

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
