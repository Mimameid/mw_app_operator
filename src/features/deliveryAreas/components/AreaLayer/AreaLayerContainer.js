import React from 'react';
import { connect } from 'react-redux';
import {
  addVertex,
  unselectVertex,
  activateArea,
  deactivateArea,
  activatePolygon,
} from 'features/deliveryAreas/slices/areaData/actions';
import AreaLayer from './AreaLayer';

export const AreaLayerContainer = (props) => {
  return <AreaLayer {...props} />;
};

const mapStateToProps = (state) => ({
  draw: state.deliveryAreas.mode.draw,
  edited: state.deliveryAreas.mode.edited,

  areas: state.deliveryAreas.areaData.areas,
  vertexSelected: state.deliveryAreas.areaData.vertexSelected,
  activeArea: state.deliveryAreas.areaData.activeArea,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addVertex: (vertex) => dispatch(addVertex(vertex)),
    unselectVertex: () => dispatch(unselectVertex()),
    activateArea: (areaNumber) => dispatch(activateArea(areaNumber)),
    activatePolygon: (polygonNumber) => dispatch(activatePolygon(polygonNumber)),
    deactivateArea: () => dispatch(deactivateArea()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaLayerContainer);
