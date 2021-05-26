import { TOGGLE_DRAW, TOGGLE_SELECT, TOGGLE_DELETE, SET_EDITED, RESET_CHANGED } from './types';

export function toggleDraw() {
  return {
    type: TOGGLE_DRAW,
  };
}
export function toggleSelect() {
  return {
    type: TOGGLE_SELECT,
  };
}
export function toggleDelete() {
  return {
    type: TOGGLE_DELETE,
  };
}
export function setEdited(value) {
  return {
    type: SET_EDITED,
    payload: value,
  };
}
export function resetChanged(value) {
  return {
    type: RESET_CHANGED,
    payload: value,
  };
}
