import React from 'react';
import { connect } from 'react-redux';
import { activateArea, toggleDrawMode, toggleSelectMode } from '../../../../../store/deliveryZoneState/action';

import AreaPanel from './AreaPanel';

export const AreaPanelContainer = (props) => {
  return <AreaPanel {...props} />;
};

const mapStateToProps = (state) => ({
  deliveryZoneState: state.deliveryZoneState,
});

const mapDispatchToProps = (dispatch) => {
  return { activateArea: (areaNumber) => dispatch(activateArea(areaNumber)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaPanelContainer);
