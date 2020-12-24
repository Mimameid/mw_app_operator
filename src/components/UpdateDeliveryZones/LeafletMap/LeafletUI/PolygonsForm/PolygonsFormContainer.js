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
} from '../../../../../store/deliveryZoneState/action';

import PolygonForms from './PolygonsForm';

export const PolygonsFormContainer = (props) => {
  return <PolygonForms {...props} />;
};

const mapStateToProps = (state) => ({
  deliveryZoneState: state.deliveryZoneState,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawmode: () => dispatch(toggleDrawmode()),
    createPolygon: () => dispatch(createPolygon()),
    savePolygon: () => dispatch(savePolygon()),
    activatePolygon: (polygonNumber) => dispatch(activatePolygon(polygonNumber)),
    addPoint: (point) => dispatch(addPoint(point)),
    removePoint: () => dispatch(removePoint()),
    removeAllPoints: () => dispatch(removeAllPoints()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PolygonsFormContainer);
