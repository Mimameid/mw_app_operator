import React from 'react';
import { connect } from 'react-redux';
import {
  toggleDrawMode,
  saveArea,
  activatePolygon,
  rotatePolygon,
  selectVertex,
  unselectVertex,
  updateVertex,
  removeVertex,
  deactivateArea,
} from '../../../../../../store/deliveryZoneState/action';
import VertexMarker from './VertexMarker';

export const VertexMarkerContainer = (props) => {
  return <VertexMarker {...props} />;
};

const mapStateToProps = (state) => ({
  vertexSelected: state.deliveryZoneState.vertexSelected,
  drawMode: state.deliveryZoneState.drawMode,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawMode: () => dispatch(toggleDrawMode()),
    selectVertex: (index) => dispatch(selectVertex(index)),
    updateVertex: (coords) => dispatch(updateVertex(coords)),
    unselectVertex: () => dispatch(unselectVertex()),
    removeVertex: () => dispatch(removeVertex()),
    saveArea: () => dispatch(saveArea()),
    rotatePolygon: () => dispatch(rotatePolygon()),
    deactivateArea: () => dispatch(deactivateArea()),
    activatePolygon: (index) => dispatch(activatePolygon(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VertexMarkerContainer);
