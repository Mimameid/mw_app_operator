import {
  TOGGLE_DRAWMODE,
  CREATE_POLYGON,
  ACTIVATE_POLYGON,
  SAVE_POLYGON,
  REMOVE_POLYGON,
  ADD_POINT,
  REMOVE_POINT,
  REMOVE_ALL_POINTS,
  SELECT_VERTEX,
  UNSELECT_VERTEX,
  UPDATE_VERTEX,
} from './types';

import { getColor } from './utils';

export function toggleDrawmode() {
  return {
    type: TOGGLE_DRAWMODE,
  };
}

export function createPolygon() {
  return {
    type: CREATE_POLYGON,
    payload: getColor(),
  };
}
export function removePolygon() {
  return {
    type: REMOVE_POLYGON,
  };
}

export function savePolygon() {
  return {
    type: SAVE_POLYGON,
  };
}

export function activatePolygon(polygonNumber) {
  return {
    type: ACTIVATE_POLYGON,
    payload: polygonNumber,
  };
}

export function addPoint(point) {
  return {
    type: ADD_POINT,
    payload: point,
  };
}

export function removePoint() {
  return {
    type: REMOVE_POINT,
  };
}

export function removeAllPoints() {
  return {
    type: REMOVE_ALL_POINTS,
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
