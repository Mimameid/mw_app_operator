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
  REMOVE_POLYGON,
  ADD_POINT,
  REMOVE_POINT,
  REMOVE_ALL_POINTS,
  SELECT_VERTEX,
  UNSELECT_VERTEX,
  UPDATE_VERTEX,
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

export function deactivateArea(areaNumber) {
  return {
    type: DEACTIVATE_AREA,
    payload: areaNumber,
  };
}

export function activatePolygon(polygonIndex) {
  return {
    type: ACTIVATE_POLYGON,
    payload: polygonIndex,
  };
}

export function removePolygon() {
  return {
    type: REMOVE_POLYGON,
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

export function updateVertex(vertexIndex) {
  return {
    type: UPDATE_VERTEX,
    payload: vertexIndex,
  };
}
