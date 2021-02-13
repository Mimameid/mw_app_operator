import React from 'react';
import { connect } from 'react-redux';
import { addVertex, unselectVertex, activateArea, activatePolygon } from '../../../../store/deliveryZoneState/action';
import AreaLayer from './AreaLayer';

export const AreaLayerContainer = (props) => {
  return <AreaLayer {...props} />;
};

const mapStateToProps = (state) => ({
  drawMode: state.deliveryZoneState.drawMode,
  areas: state.deliveryZoneState.areas,
  vertexSelected: state.deliveryZoneState.vertexSelected,
  activeArea: state.deliveryZoneState.activeArea,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addVertex: (vertex) => dispatch(addVertex(vertex)),
    unselectVertex: () => dispatch(unselectVertex()),
    activateArea: (areaNumber) => dispatch(activateArea(areaNumber)),
    activatePolygon: (polygonNumber) => dispatch(activatePolygon(polygonNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaLayerContainer);
