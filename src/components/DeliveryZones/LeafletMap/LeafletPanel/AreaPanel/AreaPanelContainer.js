import React from 'react';
import { connect } from 'react-redux';
import { activateArea } from '../../../../../store/deliveryZoneState/action';

import AreaPanel from './AreaPanel';

export const AreaPanelContainer = (props) => {
  return <AreaPanel {...props} />;
};

const mapStateToProps = (state) => ({
  areas: state.deliveryZoneState.areas,
  areaNumber: state.deliveryZoneState.areas,
});

const mapDispatchToProps = (dispatch) => {
  return { activateArea: (areaNumber) => dispatch(activateArea(areaNumber)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaPanelContainer);
