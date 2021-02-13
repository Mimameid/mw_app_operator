import { SET_WIDTH, DISABLE_WIDTH_CHANGED } from './types';

export function setWidth(width) {
  return {
    type: SET_WIDTH,
    payload: {
      width,
    },
  };
}

export function disableWidthChanged() {
  return {
    type: DISABLE_WIDTH_CHANGED,
  };
}
