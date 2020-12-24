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

const initialState = {
  drawmode: false,
  polygons: [],
  activePolygon: null,
  vertexIndex: -1,
  polygonNumber: 0,
  vertexSelected: false,
};

function deliveryZoneReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWMODE:
      return {
        ...state,
        drawmode: !state.drawmode,
      };

    case CREATE_POLYGON:
      const polygonNumber = ++state.polygonNumber;
      return {
        ...state,
        polygonNumber: polygonNumber,
        activePolygon: {
          coords: [],
          minimumOrderValue: 0,
          polygonNumber: polygonNumber,
          color: action.payload,
        },
      };

    case REMOVE_POLYGON:
      return {
        ...state,
        activePolygon: null,
      };
    case SAVE_POLYGON:
      return {
        ...state,
        polygons: [].concat(
          state.activePolygon,
          state.polygons.filter((polygon) => polygon.polygonNumber !== state.activePolygon.polygonNumber),
        ),
      };
    case ACTIVATE_POLYGON:
      return {
        ...state,
        activePolygon: state.polygons.find((polygon) => polygon.polygonNumber === parseInt(action.payload)),
      };
    case ADD_POINT:
      return {
        ...state,
        activePolygon: { ...state.activePolygon, coords: [...state.activePolygon.coords, action.payload] },
      };
    case REMOVE_POINT:
      return {
        ...state,
        activePolygon: { ...state.activePolygon, coords: state.activePolygon.coords.slice(0, -2) },
      };

    case REMOVE_ALL_POINTS:
      return {
        ...state,
        activePolygon: { ...state.activePolygon, coords: [] },
      };

    case SELECT_VERTEX:
      return {
        ...state,
        vertexIndex: action.payload,
        vertexSelected: true,
      };
    case UNSELECT_VERTEX:
      return {
        ...state,
        vertexIndex: -1,
        vertexSelected: false,
      };
    case UPDATE_VERTEX:
      const newCoords = [...state.activePolygon.coords];
      newCoords[state.vertexIndex] = action.payload;
      return {
        ...state,
        activePolygon: { ...state.activePolygon, coords: newCoords },
      };

    default:
      return state;
  }
}

export default deliveryZoneReducer;
