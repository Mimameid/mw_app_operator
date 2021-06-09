import React from 'react';
import { connect } from 'react-redux';
import { saveArea } from '../../../../../store/deliveryAreas/areaData/actions';
import { toggleDraw } from '../../../../../store/deliveryAreas/mode/actions';

import SaveDrawer from './SaveDrawer';

export const SaveDrawerContainer = (props) => {
  return <SaveDrawer {...props} />;
};

const mapStateToProps = (state) => ({
  draw: state.deliveryAreas.mode.draw,
  edited: state.deliveryAreas.mode.edited,

  activeArea: state.deliveryAreas.areaData.activeArea,
  areas: state.deliveryAreas.areaData.areas,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDraw: () => dispatch(toggleDraw()),
    saveArea: () => dispatch(saveArea()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveDrawerContainer);
