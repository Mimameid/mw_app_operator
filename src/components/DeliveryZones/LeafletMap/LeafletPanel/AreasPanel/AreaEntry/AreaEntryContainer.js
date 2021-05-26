import React from 'react';
import { connect } from 'react-redux';
import {
  activateArea,
  deactivateArea,
  deleteArea,
  addEmptyPolygon,
  setMinimumOrderValue,
  setDeliveryFee,
} from '../../../../../../store/deliveryZone/areaData/actions';
import { toggleDraw } from '../../../../../../store/deliveryZone/mode/actions';

import AreaEntry from './AreaEntry';

export const AreaEntryContainer = (props) => {
  return <AreaEntry {...props} />;
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
    activateArea: (areaNumber) => dispatch(activateArea(areaNumber)),
    deactivateArea: () => dispatch(deactivateArea()),
    addEmptyPolygon: () => dispatch(addEmptyPolygon()),
    deleteArea: (areaNumber) => dispatch(deleteArea(areaNumber)),
    setMinimumOrderValue: (value) => dispatch(setMinimumOrderValue(value)),
    setDeliveryFee: (value) => dispatch(setDeliveryFee(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaEntryContainer);
