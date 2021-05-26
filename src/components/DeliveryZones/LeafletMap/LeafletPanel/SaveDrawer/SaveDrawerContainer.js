import React from 'react';
import { connect } from 'react-redux';
import { saveArea } from '../../../../../store/deliveryZone/areaData/actions';
import { toggleDraw } from '../../../../../store/deliveryZone/mode/actions';

import SaveDrawer from './SaveDrawer';

export const SaveDrawerContainer = (props) => {
  return <SaveDrawer {...props} />;
};

const mapStateToProps = (state) => ({
  draw: state.deliveryZone.mode.draw,
  edited: state.deliveryZone.mode.edited,

  activeArea: state.deliveryZone.areaData.activeArea,
  areas: state.deliveryZone.areaData.areas,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDraw: () => dispatch(toggleDraw()),
    saveArea: () => dispatch(saveArea()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveDrawerContainer);
