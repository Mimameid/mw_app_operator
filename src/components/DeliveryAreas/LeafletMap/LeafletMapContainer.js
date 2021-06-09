import React from 'react';
import { connect } from 'react-redux';
import { disableWidthChanged } from '../../../store/drawer/actions';

import LeafletMap from './LeafletMap';

export const LeafletMapContainer = (props) => {
  return <LeafletMap {...props} />;
};

const mapStateToProps = (state) => ({
  draw: state.deliveryAreas.mode.draw,
  areas: state.deliveryAreas.areaData.areas,
  widthChanged: state.drawer.widthChanged,
});

const mapDispatchToProps = (dispatch) => {
  return {
    disableWidthChanged: () => dispatch(disableWidthChanged()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletMapContainer);
