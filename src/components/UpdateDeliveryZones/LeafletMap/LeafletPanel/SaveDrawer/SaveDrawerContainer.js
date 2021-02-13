import React from 'react';
import { connect } from 'react-redux';
import { saveArea, toggleDrawMode, toggleDeleteMode } from '../../../../../store/deliveryZoneState/action';

import SaveDrawer from './SaveDrawer';

export const SaveDrawerContainer = (props) => {
  return <SaveDrawer {...props} />;
};

const mapStateToProps = (state) => ({
  drawMode: state.deliveryZoneState.drawMode,
  activeArea: state.deliveryZoneState.activeArea,
  areas: state.deliveryZoneState.areas,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawMode: () => dispatch(toggleDrawMode()),
    toggleDeleteMode: () => dispatch(toggleDeleteMode()),
    saveArea: () => dispatch(saveArea()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveDrawerContainer);
