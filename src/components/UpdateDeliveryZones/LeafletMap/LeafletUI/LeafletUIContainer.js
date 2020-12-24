import React from 'react';
import { connect } from 'react-redux';
import {
  toggleDrawmode,
  addPoint,
  removePoint,
  removeAllPoints,
  createPolygon,
  savePolygon,
  activatePolygon,
} from '../../../../store/deliveryZoneState/action';

import LeafletUI from './LeafletUI';

export const LeafletUIContainer = (props) => {
  return <LeafletUI {...props} />;
};

const mapStateToProps = (state) => ({
  deliveryZoneState: state.deliveryZoneState,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawmode: () => dispatch(toggleDrawmode()),
    createPolygon: () => dispatch(createPolygon()),
    savePolygon: () => dispatch(savePolygon()),
    addPoint: (point) => dispatch(addPoint(point)),
    removePoint: () => dispatch(removePoint()),
    removeAllPoints: () => dispatch(removeAllPoints()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletUIContainer);
