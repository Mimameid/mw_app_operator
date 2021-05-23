import React from 'react';
import { connect } from 'react-redux';
import { activateArea } from '../../../../../store/deliveryZone/areaData/action';

import AreaPanel from './AreaPanel';

export const AreaPanelContainer = (props) => {
  return <AreaPanel {...props} />;
};

const mapStateToProps = (state) => ({
  areas: state.deliveryZone.areaData.areas,
  areaNumber: state.deliveryZone.areaData.areas,
  draw: state.deliveryZone.mode.draw,
});

const mapDispatchToProps = (dispatch) => {
  return { activateArea: (areaNumber) => dispatch(activateArea(areaNumber)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaPanelContainer);
