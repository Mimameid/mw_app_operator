import { TOGGLE_DRAW, TOGGLE_SELECT, TOGGLE_DELETE } from './types';

const initialState = {
  draw: false,
  delete: false,
  select: false,
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
    default:
      return state;
  }
}

export default modeReducer;
