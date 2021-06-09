import { SET_WIDTH, DISABLE_WIDTH_CHANGED } from './types';

const initialState = { width: 200, widthChanged: false };

function drawerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WIDTH:
      return {
        ...state,
        width: action.payload,
        widthChanged: true,
      };
    case DISABLE_WIDTH_CHANGED:
      return {
        ...state,
        widthChanged: false,
      };

    default:
      return state;
  }
}

export default drawerReducer;
