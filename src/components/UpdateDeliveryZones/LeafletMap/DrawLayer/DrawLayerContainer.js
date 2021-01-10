import React from 'react';
import { connect } from 'react-redux';
import {
  toggleDrawMode,
  toggleSelectMode,
  addPoint,
  unselectVertex,
  activateArea,
  activatePolygon,
} from '../../../../store/deliveryZoneState/action';
import DrawLayer from './DrawLayer';

export const DrawLayerContainer = (props) => {
  return <DrawLayer {...props} />;
};

const mapStateToProps = (state) => ({
  drawMode: state.deliveryZoneState.drawMode,
  selectMode: state.deliveryZoneState.selectMode,
  areas: state.deliveryZoneState.areas,

  areaNumber: state.deliveryZoneState.areaNumber,
  areaPolygons: state.deliveryZoneState.areaPolygons,
  selectedPolygonIndex: state.deliveryZoneState.selectedPolygonIndex,
  color: state.deliveryZoneState.color,

  vertexSelected: state.deliveryZoneState.vertexSelected,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawMode: () => dispatch(toggleDrawMode()),
    toggleSelectMode: () => dispatch(toggleSelectMode()),
    addPoint: (point) => dispatch(addPoint(point)),
    unselectVertex: () => dispatch(unselectVertex()),
    activateArea: (areaNumber) => dispatch(activateArea(areaNumber)),
    activatePolygon: (polygonNumber) => dispatch(activatePolygon(polygonNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawLayerContainer);
