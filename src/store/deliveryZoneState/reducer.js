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

import { getDifference } from './utils';

const initialState = {
  drawMode: false,
  deleteMode: false,
  selectMode: false,
  areas: [],
  areaNumberCounter: -1,
  // active polygon data
  areaNumber: 0, // stores which of the areas is currently selected
  areaPolygons: [], // the coordinates of a geojson multipolygon
  selectedPolygonIndex: -1, // stores which of the polygons of the area is currently being edited
  minimumOrderValue: 0,
  color: null,
  //vertex to edit
  vertexSelected: false, // triple with polygonIndex, ringIndex and vertexIndex to find the vertex in areaPolygons
  vertexIndex: -1,
};

function deliveryZoneReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWMODE: {
      let newState;
      if (state.selectMode) {
        newState = {
          ...state,
          drawMode: !state.drawMode,
        };
      } else {
        newState = {
          ...state,
          drawMode: !state.drawMode,
        };
      }
      return newState;
    }
    case TOGGLE_SELECTMODE:
      return {
        ...state,
        selectMode: !state.selectMode,
      };
    case TOGGLE_DELETEMODE:
      return {
        ...state,
        deleteMode: !state.deleteMode,
      };

    case REMOVE_POLYGON:
      return {
        ...state,
      };
    case SAVE_AREA: {
      //check if inner ring has 4 elements (validity)
      if (state.areaPolygons[state.selectedPolygonIndex][0].length > 3) {
        let newAreaPolygons = getDifference(state.areas, state.areaPolygons, state.areaNumber);

        if (!newAreaPolygons.length) {
          return state;
        }
        return {
          ...state,
          areas: [].concat(
            state.areas.filter((area) => area.areaNumber !== state.areaNumber),
            {
              areaPolygons: newAreaPolygons,
              minimumOrderValue: state.minimumOrderValue,
              areaNumber: state.areaNumber,
              color: state.color,
            },
          ),
          // deep copy areaPolygons (activated array should distinguish from the stored one)
          areaPolygons: JSON.parse(JSON.stringify(newAreaPolygons)),
        };
      }

      return state;
    }
    case CREATE_AREA:
      const areaNumber = state.areaNumberCounter + 1;
      return {
        ...state,
        areaNumberCounter: areaNumber,
        areaNumber: areaNumber,
        areaPolygons: [[[]]],
        selectedPolygonIndex: 0,
        minimumOrderValue: 0,
        color: action.payload,
      };

    case DELETE_AREA:
      return {
        ...state,
        areas: [].concat(state.areas.filter((area) => area.areaNumber !== action.payload)),
      };
    case ACTIVATE_AREA: {
      const area = state.areas.find((area) => area.areaNumber === parseInt(action.payload));
      // deep copy areaPolygons (activated array should distinguish from the stored one)
      const newAreaPolygons = JSON.parse(JSON.stringify(area.areaPolygons));

      return {
        ...state,
        areaPolygons: newAreaPolygons,
        areaNumber: area.areaNumber,
        minimumOrderValue: area.minimumOrderValue,
        color: area.color,
      };
    }
    case DEACTIVATE_AREA:
      return {
        ...state,
        areaNumber: -1,
        areaPolygons: [[[]]],
        minimumOrderValue: 0,
      };
    case ACTIVATE_POLYGON:
      return {
        ...state,
        selectedPolygonIndex: action.payload,
      };

    case ADD_POINT: {
      const newAreaPolygons = [...state.areaPolygons];
      let selectedPolygon = newAreaPolygons[state.selectedPolygonIndex];

      //check if polygon already has linear rings
      if (selectedPolygon.length > 0) {
        let outerRing = [...selectedPolygon[0]];
        // maintain linear ring structure
        if (outerRing.length > 1) {
          outerRing = outerRing.slice(0, -1);
          outerRing.push(action.payload);
          outerRing.push(outerRing[0]);
        } else {
          outerRing.push(action.payload);
          outerRing.push(action.payload);
        }
        selectedPolygon[0] = outerRing;
        newAreaPolygons[state.selectedPolygonIndex] = selectedPolygon;
      } else {
        selectedPolygon[0] = [action.payload];
      }
      return {
        ...state,
        areaPolygons: newAreaPolygons,
      };
    }
    case REMOVE_POINT: {
      const newAreaPolygons = [...state.areaPolygons];
      if (newAreaPolygons[state.selectedPolygonIndex].length > 2) {
        newAreaPolygons[state.selectedPolygonIndex] = newAreaPolygons[state.selectedPolygonIndex].slice(0, -2);
        newAreaPolygons[state.selectedPolygonIndex].push(newAreaPolygons[state.selectedPolygonIndex][0]);
      }

      return {
        ...state,
        areaPolygons: newAreaPolygons,
      };
    }
    case REMOVE_ALL_POINTS: {
      const newAreaPolygons = [...state.areaPolygons];
      newAreaPolygons[state.selectedPolygonIndex] = [];
      return {
        ...state,
        areaPolygons: newAreaPolygons,
      };
    }
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
      const newAreaPolygons = [...state.areaPolygons];

      let ring = newAreaPolygons[state.vertexIndex[0]][state.vertexIndex[1]];
      // if selected vertex is last or first element of the array update first AND last element (linear ring)
      if (state.vertexIndex[2] === 0 || state.vertexIndex[2] === ring.length - 1) {
        ring[0] = action.payload;
        ring[ring.length - 1] = action.payload;
      } else {
        ring[state.vertexIndex[2]] = action.payload;
      }
      return {
        ...state,
        areaPolygons: newAreaPolygons,
      };
    default:
      return state;
  }
}

export default deliveryZoneReducer;
