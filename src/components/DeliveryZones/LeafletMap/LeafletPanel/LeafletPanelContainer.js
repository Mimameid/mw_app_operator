import React from 'react';
import { connect } from 'react-redux';
import { deactivateArea, createArea } from '../../../../store/deliveryZone/areaData/actions';
import { submitDeliveryAreas } from '../../../../store/userState/deliveryAreas/actions';
import { toggleDraw, toggleDelete } from '../../../../store/deliveryZone/mode/actions';

import LeafletPanel from './LeafletPanel';

export const LeafletPanelContainer = (props) => {
  return <LeafletPanel {...props} />;
};

const mapStateToProps = (state) => ({
  draw: state.deliveryZone.mode.draw,
  edited: state.deliveryZone.mode.edited,

  areas: state.deliveryZone.areaData.areas,
  activeArea: state.deliveryZone.areaData.activeArea,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDraw: () => dispatch(toggleDraw()),
    toggleDelete: () => dispatch(toggleDelete()),
    createArea: () => dispatch(createArea()),
    deactivateArea: () => dispatch(deactivateArea()),
    submitDeliveryAreas: (value) => dispatch(submitDeliveryAreas(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletPanelContainer);
