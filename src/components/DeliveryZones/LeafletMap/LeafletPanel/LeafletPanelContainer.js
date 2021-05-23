import React from 'react';
import { connect } from 'react-redux';
import { deactivateArea, createArea } from '../../../../store/deliveryZone/areaData/action';
import { toggleDraw, toggleDelete } from '../../../../store/deliveryZone/mode/action';

import LeafletPanel from './LeafletPanel';

export const LeafletPanelContainer = (props) => {
  return <LeafletPanel {...props} />;
};

const mapStateToProps = (state) => ({
  draw: state.deliveryZone.mode.draw,

  areas: state.deliveryZone.areaData.areas,
  activeArea: state.deliveryZone.areaData.activeArea,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDraw: () => dispatch(toggleDraw()),
    toggleDelete: () => dispatch(toggleDelete()),
    createArea: () => dispatch(createArea()),
    deactivateArea: () => dispatch(deactivateArea()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletPanelContainer);
