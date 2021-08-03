import React from 'react';
import { connect } from 'react-redux';
import { activateArea } from 'features/deliveryAreas/slices/areaData/actions';

import AreasPanel from './AreasPanel';

export const AreasPanelContainer = (props) => {
  return <AreasPanel {...props} />;
};

const mapStateToProps = (state) => ({
  edited: state.deliveryAreas.mode.edited,
  draw: state.deliveryAreas.mode.draw,

  areas: state.deliveryAreas.areaData.areas,
  areaNumber: state.deliveryAreas.areaData.activeArea.areaNumber,
});

const mapDispatchToProps = (dispatch) => {
  return { activateArea: (areaNumber) => dispatch(activateArea(areaNumber)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreasPanelContainer);
