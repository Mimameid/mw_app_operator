import React from 'react';
import { connect } from 'react-redux';
import {
  activateArea,
  deactivateArea,
  deleteArea,
  addEmptyPolygon,
  setMinimumOrderValue,
  setDeliveryFee,
} from 'features/deliveryAreas/slices//areaData/actions';
import { toggleDraw } from 'features/deliveryAreas/slices//mode/actions';

import AreaEntry from './AreaEntry';

export const AreaEntryContainer = (props) => {
  return <AreaEntry {...props} />;
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
    activateArea: (areaNumber) => dispatch(activateArea(areaNumber)),
    deactivateArea: () => dispatch(deactivateArea()),
    addEmptyPolygon: () => dispatch(addEmptyPolygon()),
    deleteArea: (areaNumber) => dispatch(deleteArea(areaNumber)),
    setMinimumOrderValue: (value) => dispatch(setMinimumOrderValue(value)),
    setDeliveryFee: (value) => dispatch(setDeliveryFee(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaEntryContainer);
