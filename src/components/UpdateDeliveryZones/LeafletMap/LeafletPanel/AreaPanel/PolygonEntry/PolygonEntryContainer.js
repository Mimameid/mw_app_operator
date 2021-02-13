import React from 'react';
import { connect } from 'react-redux';
import {
  toggleDrawMode,
  activateArea,
  deactivateArea,
  deleteArea,
  addPolygon,
  setMinimumOrderValue,
} from '../../../../../../store/deliveryZoneState/action';

import PolygonEntry from './PolygonEntry';

export const PolygonEntryContainer = (props) => {
  return <PolygonEntry {...props} />;
};

const mapStateToProps = (state) => ({
  drawMode: state.deliveryZoneState.drawMode,

  areas: state.deliveryZoneState.areas,
  activeArea: state.deliveryZoneState.activeArea,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawMode: () => dispatch(toggleDrawMode()),
    activateArea: (areaNumber) => dispatch(activateArea(areaNumber)),
    deactivateArea: () => dispatch(deactivateArea()),
    addPolygon: () => dispatch(addPolygon()),
    deleteArea: (areaNumber) => dispatch(deleteArea(areaNumber)),
    setMinimumOrderValue: (value) => dispatch(setMinimumOrderValue(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PolygonEntryContainer);
