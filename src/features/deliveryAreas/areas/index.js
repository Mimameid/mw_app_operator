import { createReducer } from '@reduxjs/toolkit';

import {
  activateArea,
  activatePolygon,
  addEmptyPolygon,
  addPolygon,
  addVertex,
  createArea,
  deactivateArea,
  fetchAreas,
  fetchArea,
  removeArea,
  removePolygon,
  removeVertex,
  rotatePolygon,
  saveArea,
  setDeliveryFee,
  setMinOrderValue,
  updateVertex,
  setVersion,
} from './actions';

import { getCenter, getDifference } from './utils';
import { colors } from './utils';

const initialState = {
  areas: [],
  areaNumberCounter: -1,
  activeArea: {
    areaNumber: -1, // stores which of the areas is currently selected
    areaPolygons: [], // the coordinates of a geojson multipolygon
    selectedPolygonIndex: -1, // stores which of the polygons of the area is currently being edited
    minOrderValue: 0,
    deliveryFee: 0,
    color: null,
  },
  //vertex to edit
  vertexSelected: false, // quadruple with areaNumber, polygonIndex, ringIndex and vertexIndex to find the vertex in areaPolygons
  vertexIndex: -1,
};

const areas = createReducer(initialState, (builder) => {
  builder
    .addCase(createArea, (state) => {
      const areaNumber = state.areaNumberCounter + 1;

      state.areaNumberCounter = areaNumber;
      state.activeArea = {
        areaNumber: areaNumber,
        areaPolygons: [[[]]],
        selectedPolygonIndex: 0,
        minOrderValue: 0,
        deliveryFee: 0,
        color: colors.getColor(state.areas),
      };
    })
    .addCase(removeArea, (state, action) => {
      state.areas = state.areas.filter((area) => area.areaNumber !== action.payload);
    })
    .addCase(saveArea, (state) => {
      //check if inner ring has 4 elements (validity)
      if (state.activeArea.areaPolygons[state.activeArea.selectedPolygonIndex][0].length > 3) {
        // preprocess
        let newAreaPolygons = getDifference(state.areas, state.activeArea);
        if (!newAreaPolygons.length) {
          return;
        }

        let newArea = {
          ...state.activeArea,
          areaPolygons: newAreaPolygons,
          center: getCenter(newAreaPolygons),
        };

        // update activeArea
        state.activeArea.areaPolygons = newAreaPolygons;
        state.activeArea.selectedPolygonIndex =
          newAreaPolygons.length > state.activeArea.selectedPolygonIndex ? 0 : state.activeArea.selectedPolygonIndex;

        // add activeArea to areas
        const index = state.areas.findIndex((area) => area.areaNumber === state.activeArea.areaNumber);
        if (index > -1) {
          state.areas[index] = newArea;
        } else {
          state.areas.push(newArea);
        }
      }
    })
    .addCase(activateArea, (state, action) => {
      if (action.payload.hasOwnProperty('areaNumber')) {
        const area = state.areas.find((area) => area.areaNumber === parseInt(action.payload.areaNumber));
        // deep copy areaPolygons (activated array should distinguish from the stored one)
        const newAreaPolygons = JSON.parse(JSON.stringify(area.areaPolygons));
        state.activeArea = {
          areaPolygons: newAreaPolygons,
          areaNumber: area.areaNumber,

          minOrderValue: area.minOrderValue,
          deliveryFee: area.deliveryFee,
          color: area.color,
        };
      }
      state.activeArea.selectedPolygonIndex = action.polygonIndex ? action.polygonIndex : 0;
    })
    .addCase(deactivateArea, (state) => {
      state.activeArea = {
        areaNumber: -1,
        areaPolygons: [[[]]],
        selectedPolygonIndex: -1,
        minOrderValue: 0,
        deliveryFee: 0,
        color: null,
      };
    })
    .addCase(activatePolygon, (state, action) => {
      state.activeArea.selectedPolygonIndex = action.payload;
    })
    .addCase(addPolygon, (state, action) => {
      const newPolygons = [...state.activeArea.areaPolygons];
      newPolygons[state.activeArea.selectedPolygonIndex][0] = action.payload[0];
      state.activeArea.areaPolygons = newPolygons;
      state.activeArea.selectedPolygonIndex = newPolygons.length - 1;
    })
    .addCase(addEmptyPolygon, (state) => {
      state.activeArea.areaPolygons.push([[]]);
      state.activeArea.selectedPolygonIndex = state.activeArea.areaPolygons.length - 1;
    })
    .addCase(removePolygon, (state, action) => {
      // remove the polygon from the active area
      state.activeArea.areaPolygons.splice(action.payload, 1);
      // remove the polygon from the areas
      const index = state.areas.findIndex((area) => area.areaNumber === state.activeArea.areaNumber);
      state.areas[index] = state.activeArea;
    })
    .addCase(rotatePolygon, (state, action) => {
      // rotates the polygon according to the selected vertex to continue drawing from there
      // (the selected vertex will be the second last element, last is the repeating first element)
      const index = action.payload;

      let ring = state.activeArea.areaPolygons[index[0]][index[1]];
      let position = index[2];
      if (position === ring.length - 1) {
        position = 0;
      }

      ring.pop();
      ring = ring.concat(ring).slice(position + 1, position + 1 + ring.length);
      ring.push(ring[0]);
      state.activeArea.areaPolygons[index[0]][index[1]] = ring;
    })
    .addCase(addVertex, (state, action) => {
      let selectedPolygon = state.activeArea.areaPolygons[state.activeArea.selectedPolygonIndex];

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
        state.activeArea.areaPolygons[state.activeArea.selectedPolygonIndex] = selectedPolygon;
      } else {
        selectedPolygon[0] = [action.payload];
      }
    })
    .addCase(updateVertex, (state, action) => {
      const index = action.payload.index;
      const coords = action.payload.coords;

      let ring = state.activeArea.areaPolygons[index[0]][index[1]];
      // if selected vertex is last or first element of the array update first AND last element (linear ring)
      if (index[2] === 0 || index[2] === ring.length - 1) {
        ring[0] = coords;
        ring[ring.length - 1] = coords;
      } else {
        ring[index[2]] = coords;
      }
    })
    .addCase(removeVertex, (state, action) => {
      const index = action.payload;

      let ring = state.activeArea.areaPolygons[index[0]][index[1]];

      // if selected vertex is last or first element of the array update first AND last element (linear ring)
      if (index[2] === 0 || index[2] === ring.length - 1) {
        ring.shift();
        ring.pop();
        ring.push(ring[0]);
      } else {
        state.activeArea.areaPolygons[index[0]][index[1]] = [...ring.slice(0, index[2]), ...ring.slice(index[2] + 1)];
      }
    })
    .addCase(setMinOrderValue, (state, action) => {
      const index = state.areas.findIndex((area) => area.areaNumber === action.payload.areaNumber);
      state.areas[index].minOrderValue = action.payload.value;

      if (state.activeArea.areaNumber === action.payload.areaNumber) {
        state.activeArea.minOrderValue = action.payload;
      }
    })
    .addCase(setDeliveryFee, (state, action) => {
      const index = state.areas.findIndex((area) => area.areaNumber === action.payload.areaNumber);
      state.areas[index].deliveryFee = action.payload.value;

      if (state.activeArea.areaNumber === action.payload.areaNumber) {
        state.activeArea.deliveryFee = action.payload;
      }
    })
    .addCase(fetchArea.fulfilled, (state, action) => {
      const areaNumber = state.areaNumberCounter + 1;

      const newPolygons = [[[]]];
      newPolygons[0][0] = action.payload.data['area'][0];
      let newArea = {
        areaNumber: areaNumber,
        areaPolygons: newPolygons,
        selectedPolygonIndex: 0,
        minOrderValue: 0,
        deliveryFee: 0,
        color: colors.getColor(state.areas),
      };

      // preprocess
      let newAreaPolygons = getDifference(state.areas, newArea);
      if (!newAreaPolygons.length) {
        return;
      }

      newArea = {
        ...newArea,
        areaPolygons: newAreaPolygons,
        center: getCenter(newAreaPolygons),
      };

      state.areaNumberCounter = areaNumber;
      state.activeArea = newArea;
      state.areas.push(newArea);
    })
    .addCase(fetchAreas.fulfilled, (state, action) => {
      return {
        areas: action.payload.areas,
        areaNumberCounter: action.payload.areaNumberCounter,
        activeArea: {
          areaNumber: -1, // stores which of the areas is currently selected
          areaPolygons: [], // the coordinates of a geojson multipolygon
          selectedPolygonIndex: -1, // stores which of the polygons of the area is currently being edited
          minOrderValue: 0,
          deliveryFee: 0,
          color: null,
        },
        version: action.payload.version,
      };
    })
    .addCase(setVersion, (state, action) => {
      state.version = action.payload;
    });
});

export default areas;
