import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import {
  activatePolygon,
  createArea,
  deactivateArea,
  removeArea,
  removePolygon,
  removeVertex,
  saveArea,
  setDeliveryFee,
  setMinimumOrderValue,
  updateAreas,
  updateVertex,
} from 'features/deliveryAreas/areas/actions';
import { updateShop } from 'features/shop/shop/actions';
import { reset, setChanged, setDraw, setEdited } from './actions';

const initialState = { dragging: false, draw: false, edited: false, changed: false };

const mode = createReducer(initialState, (builder) =>
  builder
    .addCase(setDraw, (state, action) => {
      state.draw = action.payload;
    })
    .addCase(setEdited, (state, action) => {
      state.edited = action.payload;
      state.changed = state.changed ? state.changed : action.payload;
    })
    .addCase(setChanged, (state, action) => {
      state.changed = action.payload;
    })
    .addMatcher(isAnyOf(reset, updateAreas.fulfilled, updateShop.fulfilled), (state, action) => {
      state.changed = false;
    })
    .addMatcher(
      isAnyOf(createArea, removeArea, removePolygon, updateVertex, removeVertex, setDeliveryFee, setMinimumOrderValue),
      (state, action) => {
        state.changed = true;
      },
    )
    .addMatcher(isAnyOf(saveArea, deactivateArea), (state, action) => {
      state.draw = false;
    })
    .addMatcher(isAnyOf(saveArea), (state, action) => {
      state.edited = false;
    })
    .addMatcher(isAnyOf(activatePolygon, createArea), (state, action) => {
      state.draw = true;
    }),
);

export default mode;
