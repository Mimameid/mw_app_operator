import React from 'react';
import { connect } from 'react-redux';
import { createArea, addPolygon, saveArea } from '../../../../../store/deliveryZoneState/action';

import PLZDrawer from './PLZDrawer';

export const PLZDrawerContainer = (props) => {
  return <PLZDrawer {...props} />;
};

const mapStateToProps = (state) => ({
  drawMode: state.deliveryZoneState.drawMode,
  activeArea: state.deliveryZoneState.activeArea,
  areas: state.deliveryZoneState.areas,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createArea: () => dispatch(createArea()),
    addPolygon: (polygon) => dispatch(addPolygon(polygon)),
    saveArea: () => dispatch(saveArea()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PLZDrawerContainer);
