import React from 'react';
import { connect } from 'react-redux';
import { deactivateArea, createArea } from 'features/deliveryAreas/slices/areaData/actions';
import { toggleDraw, toggleDelete } from 'features/deliveryAreas/slices/mode/actions';
import { submitDeliveryAreas } from 'store/userState/deliveryAreas/actions';

import LeafletPanel from './LeafletPanel';

export const LeafletPanelContainer = (props) => {
  return <LeafletPanel {...props} />;
};

const mapStateToProps = (state) => ({
  draw: state.deliveryAreas.mode.draw,
  edited: state.deliveryAreas.mode.edited,

  areas: state.deliveryAreas.areaData.areas,
  activeArea: state.deliveryAreas.areaData.activeArea,
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
