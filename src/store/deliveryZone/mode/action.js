import { TOGGLE_DRAW, TOGGLE_SELECT, TOGGLE_DELETE } from './types';

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
