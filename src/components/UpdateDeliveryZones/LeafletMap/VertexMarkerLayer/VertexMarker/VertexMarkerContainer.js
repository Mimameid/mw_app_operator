import React from 'react';
import { connect } from 'react-redux';

import { selectVertex, unselectVertex, updateVertex } from '../../../../../store/deliveryZoneState/action';

import VertexMarker from './VertexMarker';

export const VertexMarkerContainer = (props) => {
  return <VertexMarker {...props} />;
};

const mapStateToProps = (state) => ({
  vertexSelected: state.deliveryZoneState.vertexSelected,
});

const mapDispatchToProps = (dispatch) => {
  return {
    selectVertex: (index) => dispatch(selectVertex(index)),
    unselectVertex: () => dispatch(unselectVertex()),
    updateVertex: (coords) => dispatch(updateVertex(coords)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VertexMarkerContainer);
