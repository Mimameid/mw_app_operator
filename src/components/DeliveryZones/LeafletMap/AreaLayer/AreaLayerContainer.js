import React from 'react';
import { connect } from 'react-redux';
import {
  addVertex,
  unselectVertex,
  activateArea,
  deactivateArea,
  activatePolygon,
} from '../../../../store/deliveryZone/areaData/action';
import AreaLayer from './AreaLayer';

export const AreaLayerContainer = (props) => {
  return <AreaLayer {...props} />;
};

const mapStateToProps = (state) => ({
  draw: state.deliveryZone.mode.draw,
  edited: state.deliveryZone.mode.edited,

  areas: state.deliveryZone.areaData.areas,
  vertexSelected: state.deliveryZone.areaData.vertexSelected,
  activeArea: state.deliveryZone.areaData.activeArea,
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
