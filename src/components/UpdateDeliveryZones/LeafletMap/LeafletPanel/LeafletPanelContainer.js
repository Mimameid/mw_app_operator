import React from 'react';
import { connect } from 'react-redux';
import {
  toggleDrawMode,
  deactivateArea,
  toggleDeleteMode,
  createArea,
  toggleSelectMode,
} from '../../../../store/deliveryZoneState/action';

import LeafletPanel from './LeafletPanel';

export const LeafletPanelContainer = (props) => {
  return <LeafletPanel {...props} />;
};

const mapStateToProps = (state) => ({
  drawMode: state.deliveryZoneState.drawMode,
  selectMode: state.deliveryZoneState.selectMode,
  deleteMode: state.deliveryZoneState.deleteMode,
  deliveryZoneState: state.deliveryZoneState,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawMode: () => dispatch(toggleDrawMode()),
    toggleSelectMode: () => dispatch(toggleSelectMode()),
    toggleDeleteMode: () => dispatch(toggleDeleteMode()),
    createArea: () => dispatch(createArea()),
    deactivateArea: () => dispatch(deactivateArea()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletPanelContainer);
