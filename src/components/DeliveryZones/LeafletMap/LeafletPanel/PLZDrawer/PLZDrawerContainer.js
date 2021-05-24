import React from 'react';
import { connect } from 'react-redux';
import { createArea, addPolygon, saveArea } from '../../../../../store/deliveryZone/areaData/action';

import PLZDrawer from './PLZDrawer';

export const PLZDrawerContainer = (props) => {
  return <PLZDrawer {...props} />;
};

const mapStateToProps = (state) => ({
  draw: state.deliveryZone.mode.draw,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createArea: () => dispatch(createArea()),
    addPolygon: (polygon) => dispatch(addPolygon(polygon)),
    saveArea: () => dispatch(saveArea()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PLZDrawerContainer);
