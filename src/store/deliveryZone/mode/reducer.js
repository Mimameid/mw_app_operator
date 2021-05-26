import { TOGGLE_DRAW, TOGGLE_SELECT, TOGGLE_DELETE, SET_EDITED, RESET_CHANGED } from './types';

const initialState = {
  draw: false,
  delete: false,
  select: false,
  edited: false,
  // determines if the deliveyArea was changed at all
  changed: false,
};

function modeReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAW: {
      let newState;
      if (state.select) {
        newState = {
          ...state,
          draw: !state.draw,
        };
      } else {
        newState = {
          ...state,
          draw: !state.draw,
        };
      }
      return newState;
    }
    case TOGGLE_SELECT:
      return {
        ...state,
        select: !state.select,
      };
    case TOGGLE_DELETE:
      return {
        ...state,
        delete: !state.delete,
      };
    case SET_EDITED:
      return {
        ...state,
        edited: action.payload,
        changed: state.edited ? true : state.changed,
      };
    case RESET_CHANGED:
      return {
        ...state,
        changed: false,
      };
    default:
      return state;
  }
}

export default modeReducer;
