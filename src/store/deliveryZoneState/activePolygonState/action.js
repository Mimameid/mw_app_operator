import { ADD_POINT, REMOVE_POINT, REMOVE_ALL_POINTS, SELECT_VERTEX, UNSELECT_VERTEX, UPDATE_VERTEX } from './types';

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
