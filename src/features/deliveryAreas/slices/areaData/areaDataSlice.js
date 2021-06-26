import { createSlice } from '@reduxjs/toolkit';
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
};

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    removePolygon(state) {},
    saveArea(state) {
      //check if inner ring has 4 elements (validity)
      if (state.activeArea.areaPolygons[state.activeArea.selectedPolygonIndex][0].length > 3) {
        let newAreaPolygons = getDifference(state.areas, state.activeArea);
        if (!newAreaPolygons.length) {
          return;
        }

        const index = state.areas.findIndex((area) => area.areaNumber === state.activeArea.areaNumber);
        if (index > -1) {
          state.areas[index] = {
            areaNumber: state.activeArea.areaNumber,
            areaPolygons: newAreaPolygons,
            minimumOrderValue: state.activeArea.minimumOrderValue,
            deliveryFee: state.activeArea.deliveryFee,
            color: state.activeArea.color,
          };
        } else {
          state.areas.push({
            areaNumber: state.activeArea.areaNumber,
            areaPolygons: newAreaPolygons,
            minimumOrderValue: state.activeArea.minimumOrderValue,
            deliveryFee: state.activeArea.deliveryFee,
            color: state.activeArea.color,
          });
        }
      }
    },
    setAreas(state, action) {
      state.areas = action.payload.areas;
      state.areaNumberCounter = action.payload.areaNumberCounter;
      state.activeArea = {
        areaNumber: -1, // stores which of the areas is currently selected
        areaPolygons: [], // the coordinates of a geojson multipolygon
        selectedPolygonIndex: -1, // stores which of the polygons of the area is currently being edited
        minimumOrderValue: 0,
        deliveryFee: 0,
        color: null,
      };
      //vertex to edit
      state.vertexSelected = false; // quadruple with areaNumber, polygonIndex, ringIndex and vertexIndex to find the vertex in areaPolygons
      state.vertexIndex = -1;
    },
    createArea(state, action) {
      const areaNumber = state.areaNumberCounter + 1;
      state.areaNumberCounter = areaNumber;
      state.activeArea = {
        areaNumber: areaNumber,
        areaPolygons: [[[]]],
        selectedPolygonIndex: 0,
        minimumOrderValue: 0,
        deliveryFee: 0,
        color: action.payload,
      };
    },
    deleteArea(state, action) {
      state.areas = state.areas.filter((area) => area.areaNumber !== action.payload);
    },
    activateArea(state, action) {
      const area = state.areas.find((area) => area.areaNumber === parseInt(action.payload));
      // deep copy areaPolygons (activated array should distinguish from the stored one)
      const newAreaPolygons = JSON.parse(JSON.stringify(area.areaPolygons));
      state.activeArea = {
        areaPolygons: newAreaPolygons,
        areaNumber: area.areaNumber,
        selectedPolygonIndex: 0,
        minimumOrderValue: area.minimumOrderValue,
        deliveryFee: area.deliveryFee,
        color: area.color,
      };
    },
    deactivateArea(state) {
      state.activeArea = {
        ...state.activeArea,
        areaNumber: -1,
        areaPolygons: [[[]]],
        selectedPolygonIndex: -1,
        minimumOrderValue: 0,
        deliveryFee: 0,
        color: null,
      };
    },
  },
});

export const { removePolygon, saveArea, setAreas, createArea, deleteArea, activateArea, deactivateArea } =
  areasSlice.actions;
export default areasSlice.reducer;
