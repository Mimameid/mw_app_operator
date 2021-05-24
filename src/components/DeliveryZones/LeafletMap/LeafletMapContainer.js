import React from 'react';
import { connect } from 'react-redux';
import { disableWidthChanged } from '../../../store/drawerState/action';

import LeafletMap from './LeafletMap';

export const LeafletMapContainer = (props) => {
  return <LeafletMap {...props} />;
};

const mapStateToProps = (state) => ({
  draw: state.deliveryZone.mode.draw,
  areas: state.deliveryZone.areaData.areas,
  widthChanged: state.drawerState.widthChanged,
});

const mapDispatchToProps = (dispatch) => {
  return {
    disableWidthChanged: () => dispatch(disableWidthChanged()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletMapContainer);
