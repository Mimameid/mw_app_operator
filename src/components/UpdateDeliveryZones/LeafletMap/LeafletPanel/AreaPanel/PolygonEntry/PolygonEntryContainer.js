import React from 'react';
import { connect } from 'react-redux';
import {
  toggleSelectMode,
  toggleDrawMode,
  activateArea,
  deactivateArea,
  deleteArea,
} from '../../../../../../store/deliveryZoneState/action';

import PolygonEntry from './PolygonEntry';

export const PolygonEntryContainer = (props) => {
  return <PolygonEntry {...props} />;
};

const mapStateToProps = (state) => ({
  deliveryZoneState: state.deliveryZoneState,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawMode: () => dispatch(toggleDrawMode()),
    toggleSelectMode: () => dispatch(toggleSelectMode()),
    activateArea: (areaNumber) => dispatch(activateArea(areaNumber)),
    deactivateArea: () => dispatch(deactivateArea()),
    deleteArea: (areaNumber) => dispatch(deleteArea(areaNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PolygonEntryContainer);
