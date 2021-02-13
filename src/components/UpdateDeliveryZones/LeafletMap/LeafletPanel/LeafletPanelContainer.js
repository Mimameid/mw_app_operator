import React from 'react';
import { connect } from 'react-redux';
import {
  toggleDrawMode,
  deactivateArea,
  toggleDeleteMode,
  createArea,
} from '../../../../store/deliveryZoneState/action';

import LeafletPanel from './LeafletPanel';

export const LeafletPanelContainer = (props) => {
  return <LeafletPanel {...props} />;
};

const mapStateToProps = (state) => ({
  drawMode: state.deliveryZoneState.drawMode,

  areas: state.deliveryZoneState.areas,
  activeArea: state.deliveryZoneState.activeArea,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawMode: () => dispatch(toggleDrawMode()),
    toggleDeleteMode: () => dispatch(toggleDeleteMode()),
    createArea: () => dispatch(createArea()),
    deactivateArea: () => dispatch(deactivateArea()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletPanelContainer);
