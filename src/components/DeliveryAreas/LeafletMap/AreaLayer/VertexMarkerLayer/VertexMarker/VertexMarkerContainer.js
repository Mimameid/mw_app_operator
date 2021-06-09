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
} from '../../../../../../store/deliveryAreas/areaData/actions';
import { toggleDraw } from '../../../../../../store/deliveryAreas/mode/actions';
import VertexMarker from './VertexMarker';

export const VertexMarkerContainer = (props) => {
  return <VertexMarker {...props} />;
};

const mapStateToProps = (state) => ({
  vertexSelected: state.deliveryAreas.areaData.vertexSelected,
  draw: state.deliveryAreas.mode.draw,
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
