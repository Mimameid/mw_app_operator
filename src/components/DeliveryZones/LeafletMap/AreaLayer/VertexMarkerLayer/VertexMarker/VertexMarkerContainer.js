import React from 'react';
import { connect } from 'react-redux';
import {
  saveArea,
  activatePolygon,
  rotatePolygon,
  selectVertex,
  unselectVertex,
  updateVertex,
  removeVertex,
} from '../../../../../../store/deliveryZone/areaData/action';
import { toggleDraw } from '../../../../../../store/deliveryZone/mode/action';
import VertexMarker from './VertexMarker';

export const VertexMarkerContainer = (props) => {
  return <VertexMarker {...props} />;
};

const mapStateToProps = (state) => ({
  vertexSelected: state.deliveryZone.areaData.vertexSelected,
  draw: state.deliveryZone.mode.draw,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDraw: () => dispatch(toggleDraw()),
    selectVertex: (index) => dispatch(selectVertex(index)),
    updateVertex: (coords) => dispatch(updateVertex(coords)),
    unselectVertex: () => dispatch(unselectVertex()),
    removeVertex: () => dispatch(removeVertex()),
    saveArea: () => dispatch(saveArea()),
    rotatePolygon: () => dispatch(rotatePolygon()),
    activatePolygon: (index) => dispatch(activatePolygon(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VertexMarkerContainer);
