import { ADD_POINT, REMOVE_POINT, REMOVE_ALL_POINTS, SELECT_VERTEX, UNSELECT_VERTEX, UPDATE_VERTEX } from './types';

const initialState = {
  coords: [],
  minimumOrderValue: 0,
  polygonNumber: -1,
  color: null,
};

function activePolygonReducer(state = initialState, action) {
  // switch (action.type) {
  //   case ADD_POINT:
  //     return {
  //       ...state,
  //       activePolygon: { ...state.activePolygon, coords: [...state.activePolygon.coords, action.payload] },
  //     };
  //   case REMOVE_POINT:
  //     return {
  //       ...state,
  //       activePolygon: { ...state.activePolygon, coords: state.activePolygon.coords.slice(0, -2) },
  //     };
  //   case REMOVE_ALL_POINTS:
  //     return {
  //       ...state,
  //       activePolygon: { ...state.activePolygon, coords: [] },
  //     };
  //   case SELECT_VERTEX:
  //     return {
  //       ...state,
  //       vertexIndex: action.payload,
  //       vertexSelected: true,
  //     };
  //   case UNSELECT_VERTEX:
  //     return {
  //       ...state,
  //       vertexIndex: -1,
  //       vertexSelected: false,
  //     };
  //   case UPDATE_VERTEX:
  //     const newCoords = [...state.activePolygon.coords];
  //     newCoords[state.vertexIndex] = action.payload;
  //     return {
  //       ...state,
  //       activePolygon: { ...state.activePolygon, coords: newCoords },
  //     };
  //   default:
  //     return state;
  // }
  return state;
}

export default activePolygonReducer;
