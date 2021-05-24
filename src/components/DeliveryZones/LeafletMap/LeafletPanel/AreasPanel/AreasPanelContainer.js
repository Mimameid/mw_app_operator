import React from 'react';
import { connect } from 'react-redux';
import { activateArea } from '../../../../../store/deliveryZone/areaData/action';

import AreasPanel from './AreasPanel';

export const AreasPanelContainer = (props) => {
  return <AreasPanel {...props} />;
};

const mapStateToProps = (state) => ({
  edited: state.deliveryZone.mode.edited,
  draw: state.deliveryZone.mode.draw,

  areas: state.deliveryZone.areaData.areas,
  areaNumber: state.deliveryZone.areaData.activeArea.areaNumber,
});

const mapDispatchToProps = (dispatch) => {
  return { activateArea: (areaNumber) => dispatch(activateArea(areaNumber)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreasPanelContainer);
