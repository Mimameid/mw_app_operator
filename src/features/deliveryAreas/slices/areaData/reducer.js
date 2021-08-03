import {
  SET_AREAS,
  SET_AREAS_VERSION,
  CREATE_AREA,
  DELETE_AREA,
  SAVE_AREA,
  ACTIVATE_AREA,
  DEACTIVATE_AREA,
  ACTIVATE_POLYGON,
  ADD_POLYGON,
  ADD_EMPTY_POLYGON,
  REMOVE_POLYGON,
  ROTATE_POLYGON,
  ADD_VERTEX,
  REMOVE_VERTEX,
  SELECT_VERTEX,
  UNSELECT_VERTEX,
  UPDATE_VERTEX,
  SET_MINIMUM_ORDER_VALUE,
  SET_DELIVERY_FEE,
} from './types';

import { getDifference } from './utils';

const initialState = {
  areas: [],
  areaNumberCounter: -1,
  activeArea: {
    areaNumber: -1, // stores which of the areas is currently selected
    areaPolygons: [], // the coordinates of a geojson multipolygon
    selectedPolygonIndex: -1, // stores which of the polygons of the area is currently being edited
    minimumOrderValue: 0,
    deliveryFee: 0,
    color: null,
  },
  //vertex to edit
  vertexSelected: false, // quadruple with areaNumber, polygonIndex, ringIndex and vertexIndex to find the vertex in areaPolygons
  vertexIndex: -1,
  version: null,
};

function areaDataReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_POLYGON:
      return {
        ...state,
      };
    case SAVE_AREA: {
      //check if inner ring has 4 elements (validity)
      if (state.activeArea.areaPolygons[state.activeArea.selectedPolygonIndex][0].length > 3) {
        let newAreaPolygons = getDifference(state.areas, state.activeArea);
        if (!newAreaPolygons.length) {
          return state;
        }

        const index = state.areas.findIndex((area) => area.areaNumber === state.activeArea.areaNumber);
        let newAreas;
        if (index > -1) {
          newAreas = state.areas.slice();
          newAreas.splice(index, 1);
          newAreas = [
            ...newAreas.slice(0, index),
            {
              areaNumber: state.activeArea.areaNumber,
              areaPolygons: newAreaPolygons,
              minimumOrderValue: state.activeArea.minimumOrderValue,
              deliveryFee: state.activeArea.deliveryFee,
              color: state.activeArea.color,
            },
            ...newAreas.slice(index),
          ];
        } else {
          newAreas = [
            ...state.areas,
            {
              areaNumber: state.activeArea.areaNumber,
              areaPolygons: newAreaPolygons,
              minimumOrderValue: state.activeArea.minimumOrderValue,
              deliveryFee: state.activeArea.deliveryFee,
              color: state.activeArea.color,
            },
          ];
        }
        return {
          ...state,
          areas: newAreas,
          activeArea: {
            ...state.activeArea,
            // deep copy areaPolygons (activated array should distinguish from the stored one)
            areaPolygons: JSON.parse(JSON.stringify(newAreaPolygons)),
            // getDifference can cause the number of polygons to shrink
            // ensure that selectedPolygonIndex doesn't overflow the number of existing polygons
            selectedPolygonIndex:
              state.activeArea.areaPolygons.length > state.activeArea.selectedPolygonIndex
                ? 0
                : state.activeArea.selectedPolygonIndex,
          },
        };
      }
      return state;
    }
    case SET_AREAS:
      return {
        areas: action.payload.areas,
        areaNumberCounter: action.payload.areaNumberCounter,
        activeArea: {
          areaNumber: -1, // stores which of the areas is currently selected
          areaPolygons: [], // the coordinates of a geojson multipolygon
          selectedPolygonIndex: -1, // stores which of the polygons of the area is currently being edited
          minimumOrderValue: 0,
          deliveryFee: 0,
          color: null,
        },
        //vertex to edit
        vertexSelected: false, // quadruple with areaNumber, polygonIndex, ringIndex and vertexIndex to find the vertex in areaPolygons
        vertexIndex: -1,
      };
    case SET_AREAS_VERSION:
      return {
        ...state,
        version: action.payload,
      };
    case CREATE_AREA:
      const areaNumber = state.areaNumberCounter + 1;
      return {
        ...state,
        areaNumberCounter: areaNumber,
        activeArea: {
          areaNumber: areaNumber,
          areaPolygons: [[[]]],
          selectedPolygonIndex: 0,
          minimumOrderValue: 0,
          deliveryFee: 0,
          color: action.payload,
        },
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
      const newActiveArea = {
        areaPolygons: newAreaPolygons,
        areaNumber: area.areaNumber,
        selectedPolygonIndex: 0,
        minimumOrderValue: area.minimumOrderValue,
        deliveryFee: area.deliveryFee,
        color: area.color,
      };

      return {
        ...state,
        activeArea: newActiveArea,
      };
    }
    case DEACTIVATE_AREA:
      return {
        ...state,
        activeArea: {
          ...state.activeArea,
          areaNumber: -1,
          areaPolygons: [[[]]],
          selectedPolygonIndex: -1,
          minimumOrderValue: 0,
          deliveryFee: 0,
          color: null,
        },
      };

    case ADD_POLYGON: {
      const newPolygons = [...state.activeArea.areaPolygons];
      newPolygons[state.activeArea.selectedPolygonIndex][0] = action.payload[0];
      return {
        ...state,
        activeArea: {
          ...state.activeArea,
          areaPolygons: newPolygons,
          selectedPolygonIndex: newPolygons.length - 1,
        },
      };
    }
    case ADD_EMPTY_POLYGON:
      const newPolygons = [...state.activeArea.areaPolygons];
      newPolygons.push([[]]);
      return {
        ...state,
        activeArea: {
          ...state.activeArea,
          areaPolygons: newPolygons,
          selectedPolygonIndex: newPolygons.length - 1,
        },
      };
    case ACTIVATE_POLYGON:
      return {
        ...state,
        activeArea: {
          ...state.activeArea,
          selectedPolygonIndex: action.payload,
        },
      };
    case ROTATE_POLYGON: {
      // rotates the polygon according to the selected vertex to continue drawing from there
      // (the selected vertex will be the second last element, last is the repeating first element)
      const newAreaPolygons = [...state.activeArea.areaPolygons];

      let ring = newAreaPolygons[state.vertexIndex[1]][state.vertexIndex[2]];
      let position = state.vertexIndex[3];
      if (position === ring.length - 1) {
        position = 0;
      }

      ring.pop();
      ring = ring.concat(ring).slice(position + 1, position + 1 + ring.length);
      ring.push(ring[0]);
      newAreaPolygons[state.vertexIndex[1]][state.vertexIndex[2]] = ring;

      return {
        ...state,
        activeArea: {
          ...state.activeArea,
          areaPolygons: newAreaPolygons,
        },
      };
    }
    case ADD_VERTEX: {
      const newAreaPolygons = [...state.activeArea.areaPolygons];
      let selectedPolygon = newAreaPolygons[state.activeArea.selectedPolygonIndex];

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
        newAreaPolygons[state.activeArea.selectedPolygonIndex] = selectedPolygon;
      } else {
        selectedPolygon[0] = [action.payload];
      }

      return {
        ...state,
        activeArea: {
          ...state.activeArea,
          areaPolygons: newAreaPolygons,
        },
      };
    }
    case REMOVE_VERTEX: {
      const newAreaPolygons = [...state.activeArea.areaPolygons];
      let ring = newAreaPolygons[state.vertexIndex[1]][state.vertexIndex[2]];

      if (ring.length > 4) {
        // if selected vertex is last or first element of the array update first AND last element (linear ring)
        if (state.vertexIndex[3] === 0 || state.vertexIndex[3] === ring.length - 1) {
          ring.shift();
          ring.pop();
          ring.push(ring[0]);
        } else {
          newAreaPolygons[state.vertexIndex[1]][state.vertexIndex[2]] = [
            ...ring.slice(0, state.vertexIndex[3]),
            ...ring.slice(state.vertexIndex[3] + 1),
          ];
        }
      }

      return {
        ...state,
        activeArea: {
          ...state.activeArea,
          areaPolygons: newAreaPolygons,
        },
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
      const newAreaPolygons = [...state.activeArea.areaPolygons];
      let ring = newAreaPolygons[state.vertexIndex[1]][state.vertexIndex[2]];
      // if selected vertex is last or first element of the array update first AND last element (linear ring)
      if (state.vertexIndex[3] === 0 || state.vertexIndex[3] === ring.length - 1) {
        ring[0] = action.payload;
        ring[ring.length - 1] = action.payload;
      } else {
        ring[state.vertexIndex[3]] = action.payload;
      }
      return {
        ...state,
        activeArea: {
          ...state.activeArea,
          areaPolygons: newAreaPolygons,
        },
      };
    case SET_MINIMUM_ORDER_VALUE: {
      const area = state.areas.find((area) => area.areaNumber === parseInt(action.payload.areaNumber));
      const index = state.areas.findIndex((area) => area.areaNumber === action.payload.areaNumber);

      let newAreas = state.areas.slice();
      newAreas[index] = {
        ...area,
        minimumOrderValue: action.payload.value,
      };

      if (state.activeArea.areaNumber === action.payload.areaNumber) {
        return {
          ...state,
          areas: newAreas,
          activeArea: {
            ...state.activeArea,
            deliveryFee: action.payload,
          },
        };
      }

      return {
        ...state,
        areas: newAreas,
      };
    }
    case SET_DELIVERY_FEE: {
      const area = state.areas.find((area) => area.areaNumber === parseInt(action.payload.areaNumber));
      const index = state.areas.findIndex((area) => area.areaNumber === action.payload.areaNumber);

      let newAreas = state.areas.slice();
      newAreas[index] = {
        ...area,
        deliveryFee: action.payload.value,
      };

      if (state.activeArea.areaNumber === action.payload.areaNumber) {
        return {
          ...state,
          areas: newAreas,
          activeArea: {
            ...state.activeArea,
            deliveryFee: action.payload,
          },
        };
      }

      return {
        ...state,
        areas: newAreas,
      };
    }
    default:
      return state;
  }
}

export default areaDataReducer;
